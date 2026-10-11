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
  const [inputState, setInputState] = useState<NeedsInput | undefined>();
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    setMessages(data?.messages ?? []);
    setInputState(data?.needsInput);
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

  const handleAnswer = async (answer: string): Promise<void> => {
    if (!inputState) {
      return;
    }

    setActionError(null);
    try {
      const result = await answerNeedsInput(inputState.id, answer);
      setInputState(result);
    } catch (answerError) {
      setActionError(
        answerError instanceof Error ? answerError.message : 'Answer could not be saved.',
      );
    }
  };

  return (
    <section>
      <PulseChannelHeader channel={data.channel} />
      {inputState && <NeedsInputCard needsInput={inputState} onAnswer={handleAnswer} />}
      {actionError && <DashboardError message={actionError} />}
      <MessageList messages={messages} />
      <MessageComposer onSend={handleSend} />
    </section>
  );
}
