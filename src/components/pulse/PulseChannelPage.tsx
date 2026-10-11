import { useCallback, useEffect, useMemo, useRef, useState, type ElementRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { Message, NeedsInput } from '../../data/types';
import { useAsync } from '../../hooks/useAsync';
import { answerNeedsInput, getAvaniBotReply, getChannel, sendMessage } from '../../services/api';
import { DashboardError, DashboardLoading } from '../dashboard/DashboardState';
import { NeedsInputCard } from './NeedsInputCard';
import { PulseChannelHeader } from './PulseChannelHeader';
import { MessageList } from './MessageList';
import { MessageComposer } from './MessageComposer';

export function PulseChannelPage(): JSX.Element {
  const { channelId } = useParams<{ channelId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const request = useCallback(() => getChannel(channelId ?? ''), [channelId]);
  const requestDeps = useMemo(() => [channelId], [channelId]);
  const { data, loading, error } = useAsync(request, requestDeps);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputStates, setInputStates] = useState<NeedsInput[]>([]);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isPinnedExpanded, setIsPinnedExpanded] = useState(true);
  const composerRef = useRef<ElementRef<'input'>>(null);
  const intentHandled = useRef(false);

  useEffect(() => {
    setMessages(data?.messages ?? []);
    setInputStates(data?.needsInputs ?? []);
  }, [data]);

  const handleSend = useCallback(
    async (body: string): Promise<void> => {
      if (!data) {
        return;
      }

      setActionError(null);
      try {
        const message = await sendMessage(data.channel.id, body);
        setMessages((current) => [...current, message]);
        if (data.channel.slug === 'avanibot') {
          const reply = await getAvaniBotReply(data.channel.id, body);
          setMessages((current) => [...current, reply]);
        }
      } catch (sendError) {
        setActionError(sendError instanceof Error ? sendError.message : 'Message could not be sent.');
      }
    },
    [data],
  );

  useEffect(() => {
    if (!data || data.channel.slug !== 'avanibot' || intentHandled.current) {
      return;
    }

    const intent = location.state as { autoMessage?: string; focusComposer?: boolean } | null;
    intentHandled.current = true;
    if (intent?.autoMessage) {
      void handleSend(intent.autoMessage);
    }
    if (intent?.focusComposer) {
      composerRef.current?.focus();
    }
    navigate(location.pathname, { replace: true, state: null });
  }, [data, handleSend, location.pathname, location.state, navigate]);

  if (loading) {
    return <DashboardLoading />;
  }

  if (error) {
    return <DashboardError message={error.message} />;
  }

  if (!data) {
    return <DashboardError message="Channel could not be loaded." />;
  }

  const handleAnswer = async (id: string, answer: string): Promise<void> => {
    setActionError(null);
    try {
      const result = await answerNeedsInput(id, answer);
      setInputStates((current) => current.map((input) => (input.id === id ? result : input)));
    } catch (answerError) {
      setActionError(
        answerError instanceof Error ? answerError.message : 'Answer could not be saved.',
      );
    }
  };
  const isAvaniBot = data.channel.slug === 'avanibot';
  const openInputCount = inputStates.filter((input) => input.status === 'open').length;

  return (
    <section>
      <PulseChannelHeader channel={data.channel} />
      {isAvaniBot && openInputCount > 0 ? (
        <section className="mt-5 rounded-md bg-purple-soft p-3">
          <button
            type="button"
            onClick={() => setIsPinnedExpanded((expanded) => !expanded)}
            className="flex w-full items-center justify-between text-left"
            aria-expanded={isPinnedExpanded}
          >
            <span className="flex items-center gap-2 text-12 font-semibold text-text">
              Needs your input
              <span className="rounded-full bg-danger px-2 py-0.5 text-10 text-white">
                {openInputCount}
              </span>
              <span className="text-11 font-normal text-text-muted">pinned</span>
            </span>
            <span className="text-12 text-text-muted">{isPinnedExpanded ? '⌃' : '⌄'}</span>
          </button>
          {isPinnedExpanded && (
            <div className="mt-3 space-y-3">
              {inputStates.map((input) => (
                <NeedsInputCard
                  key={input.id}
                  needsInput={input}
                  showLabel={false}
                  onAnswer={(answer) => void handleAnswer(input.id, answer)}
                />
              ))}
            </div>
          )}
        </section>
      ) : (
        !isAvaniBot &&
        inputStates.length > 0 && (
          <div className="mt-5 space-y-3">
            {inputStates.map((input) => (
              <NeedsInputCard
                key={input.id}
                needsInput={input}
                onAnswer={(answer) => void handleAnswer(input.id, answer)}
              />
            ))}
          </div>
        )
      )}
      {actionError && <DashboardError message={actionError} />}
      <MessageList messages={messages} />
      <MessageComposer
        onSend={handleSend}
        inputRef={isAvaniBot ? composerRef : undefined}
        placeholder={isAvaniBot ? 'Message AvaniBot…' : undefined}
      />
    </section>
  );
}
