export interface ExperimentConfig {
    key: string
    title: string
    description: string
    defaultPrompt: string
    challenges: string[]
}

export const experiments: ExperimentConfig[] = [
    {
        key: 'insight-synthesis',
        title: 'Insight Synthesis',
        description: 'Summarize, extract themes, distill meaning.',
        defaultPrompt: `Summarize the following text in 5 bullet points and identify 3 risks or limitations.`,
        challenges: [
            'Summarize this report in 5 key points.',
            'Compare and contrast two articles for agreements and disagreements.',
            'Extract key themes and propose 3 next steps for a team.',
            'Design an automated workflow that feeds new reports into GPT and generates thematic summaries.'
        ]
    },
    {
        key: 'workflow-automation',
        title: 'Workflow Automation',
        description: 'Automate repetitive tasks using AI helpers.',
        defaultPrompt: `Draft a reusable template for my weekly meeting agenda.`,
        challenges: [
            'Create a reusable weekly task template.',
            'Automate summarize-then-email workflow.',
            'Design a multi-step automation: form → GPT → Slack.',
            'Experiment with Notion AI or Slack summaries for reporting.'
        ]
    },
    {
        key: 'cross-domain-reframing',
        title: 'Cross-Domain Reframing',
        description: 'Rewrite content for different audiences or tones.',
        defaultPrompt: `Rewrite this message for an executive audience unfamiliar with the topic.`,
        challenges: [
            'Rewrite this email for senior execs.',
            'Explain this to a student, journalist, customer.',
            'Experiment with rewriting tone: casual / formal / playful.',
            'Adapt copy for cultural context: Europe / NA / Asia.'
        ]
    },
    {
        key: 'agent-collaboration',
        title: 'Agent Collaboration',
        description: 'Chain AI agents together for better output.',
        defaultPrompt: `First act as my brainstormer (generate 5 ideas), then critique each idea.`,
        challenges: [
            'Simulate two-agent critique cycle.',
            'Compare how Claude and GPT behave on the same task.',
            'Multi-step agent workflow: doc → summary → Slack.',
            'Design your own multi-agent workflow.'
        ]
    },
    {
        key: 'ethical-prompting',
        title: 'Ethical Prompting & Judgment',
        description: 'Critically assess AI output for risks, biases, or hallucinations.',
        defaultPrompt: `What assumptions did you make in answering my last question?`,
        challenges: [
            'Ask: "What assumptions did you make here?"',
            'Ask: "What parts of this output might be wrong or need verification?"',
            'Simulate an ethical review: "What risks if this is wrong or biased?"',
            'Draft a prompting policy for your team: when to trust vs verify.'
        ]
    }
]
