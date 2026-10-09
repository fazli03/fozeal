'use client'

import { useState } from 'react'
import { Activity, Sparkles, Terminal, Code2 } from 'lucide-react'
import { FrameLabel } from '@/components/system/frame'

export function SystemTokens() {
    const [copiedToken, setCopiedToken] = useState<string | null>(null)

    const copyToken = (val: string) => {
        navigator.clipboard.writeText(val)
        setCopiedToken(val)
        setTimeout(() => setCopiedToken(null), 2000)
    }

    return (
        <section className="border-t border-hairline py-section-sm">
            <div className="shell">
                <FrameLabel meta="Design System Specifications" className="mb-10 pt-4">
                    Capabilities & Live Tokens
                </FrameLabel>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                        onClick={() => copyToken('--color-accent: #10B981')}
                        className="cursor-pointer border border-hairline bg-paper p-6 hover:border-accent transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-mono text-micro text-graphite">TOKEN 01 // ACCENT</span>
                            <Sparkles size={14} className="text-accent" />
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-5 w-5 bg-accent rounded-sm" />
                            <span className="font-mono text-body font-medium">#10B981 (Primary)</span>
                        </div>
                        <p className="font-mono text-micro text-graphite">
                            {copiedToken === '--color-accent: #10B981' ? 'Copied to Clipboard!' : 'Click to copy token variable'}
                        </p>
                    </div>

                    <div
                        onClick={() => copyToken('font-family: var(--font-display)')}
                        className="cursor-pointer border border-hairline bg-paper p-6 hover:border-accent transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-mono text-micro text-graphite">TOKEN 02 // TYPOGRAPHY</span>
                            <Terminal size={14} className="text-accent" />
                        </div>
                        <div className="font-mono text-body font-medium mb-2">
                            Display & Monospace System
                        </div>
                        <p className="font-mono text-micro text-graphite">
                            {copiedToken === 'font-family: var(--font-display)' ? 'Copied to Clipboard!' : 'Click to copy typography spec'}
                        </p>
                    </div>

                    <div
                        onClick={() => copyToken('workflow: AI-First UI Prompting')}
                        className="cursor-pointer border border-hairline bg-paper p-6 hover:border-accent transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-mono text-micro text-graphite">TOKEN 03 // WORKFLOW</span>
                            <Code2 size={14} className="text-accent" />
                        </div>
                        <div className="font-mono text-body font-medium mb-2">
                            Figma Tokens & AI Prompting
                        </div>
                        <p className="font-mono text-micro text-graphite">
                            {copiedToken === 'workflow: AI-First UI Prompting' ? 'Copied to Clipboard!' : 'Click to copy workflow stack'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}