<script lang="ts">
	// TRANSCRIPT VIEWER COMPONENT
	// Displays conversation transcripts with messages
	// DISPOSABLE - delete and regenerate if tests fail

	import type { Transcript } from '$lib/contracts';

	export let transcript: Transcript;
</script>

<div class="transcript-viewer">
	{#if transcript.title}
		<h2 class="transcript-title">{transcript.title}</h2>
	{/if}

	{#if transcript.date}
		<div class="transcript-date">{transcript.date}</div>
	{/if}

	<div class="messages">
		{#if transcript.messages.length === 0}
			<div class="empty-state">No messages</div>
		{:else}
			{#each transcript.messages as message}
				<div class="message" class:highlight={message.isHighlight}>
					<div class="message-speaker">
						{message.speaker}
						{#if message.speaker === 'ai'}
							<span class="ai-source">({message.aiSource})</span>
						{/if}
					</div>
					<div class="message-content">{message.content}</div>
					{#if message.annotation}
						<div class="message-annotation">{message.annotation}</div>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.transcript-viewer {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.transcript-title {
		color: var(--text-primary);
		font-size: 1.5rem;
		margin: 0;
	}

	.transcript-date {
		color: var(--text-secondary);
		font-size: 0.875rem;
	}

	.messages {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.empty-state {
		color: var(--text-tertiary);
		text-align: center;
		padding: var(--space-xl);
	}

	.message {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--bg-secondary);
		border-radius: var(--radius-sm);
		border-left: 3px solid transparent;
	}

	.message.highlight {
		background: var(--bg-tertiary);
		border-left-color: var(--color-highlight);
	}

	.message-speaker {
		color: var(--text-secondary);
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.ai-source {
		color: var(--color-claude);
		font-weight: 400;
	}

	.message-content {
		color: var(--text-primary);
		line-height: 1.6;
	}

	.message-annotation {
		color: var(--color-highlight);
		font-size: 0.875rem;
		font-style: italic;
		padding-top: var(--space-xs);
		border-top: 1px solid var(--bg-tertiary);
	}
</style>
