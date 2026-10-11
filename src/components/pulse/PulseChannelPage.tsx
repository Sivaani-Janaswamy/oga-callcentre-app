import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Message, NeedsInput } from '../../data/types';
import { useAsync } from '../../hooks/useAsync';
import { answerNeedsInput, getChannel, sendMessage } from '../../services/api';
import { DashboardError, DashboardLoading } from '../dashboard/DashboardState';
import { NeedsInputCard } from './NeedsInputCard';
import { PulseChannelHeader } from './PulseChannelHeader';
import { MessageList } from './MessageList';
import { MessageComposer } from './MessageComposer';

export function PulseChannelPage(): JSX.Element {
  const { channelId } = useParams<{ channelId: string }>();
  const request = useCallback(() => getChannel(channelId ?? ''), [channelId]);
  const requestDeps = useMemo(() => [channelId], [channelId]);
  const { data, loading, error } = useAsync(request, requestDeps);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputStates, setInputStates] = useState<NeedsInput[]>([]);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    setMessages(data?.messages ?? []);
    setInputStates(data?.needsInputs ?? []);
  }, [data]);

  if (loading) {
    return <DashboardLoading />;
  }

  if (error) {
    return <DashboardError message={error.message} />;
  }

  if (!data) {
    return <DashboardError message="Channel could not be loaded." />;
  }

  const handleSend = async (body: string): Promise<void> => {
    setActionError(null);
    try {
      const message = await sendMessage(data.channel.id, body);
      setMessages((current) => [...current, message]);
    } catch (sendError) {
      setActionError(sendError instanceof Error ? sendError.message : 'Message could not be sent.');
    }
  };

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

  return (
    <section>
      <PulseChannelHeader channel={data.channel} />
      {inputStates.length > 0 && (
        <div className="mt-5 space-y-3">
          {inputStates.map((input) => (
            <NeedsInputCard
              key={input.id}
              needsInput={input}
              onAnswer={(answer) => void handleAnswer(input.id, answer)}
            />
          ))}
        </div>
      )}
      {actionError && <DashboardError message={actionError} />}
      <MessageList messages={messages} />
      <MessageComposer onSend={handleSend} />
    </section>
  );
}
