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
		gap: 1rem;
	}

	.messages {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.message {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.message.highlight {
		font-weight: bold;
	}
</style>
