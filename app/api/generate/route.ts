import { Anthropic } from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.ANTHROPIC_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'Anthropic API key not configured' },
                { status: 500 }
            );
        }

        const anthropic = new Anthropic({
            apiKey: apiKey,
        });

        const body = await req.json();
        const { image, framework, style, quality } = body;

        if (!image) {
            return NextResponse.json(
                { error: 'No image provided' },
                { status: 400 }
            );
        }

        const qualityPrompts = [
            'Create a quick, functional implementation.',
            'Create a well-structured, production-ready implementation with proper component organization.',
            'Create a premium, pixel-perfect implementation with exceptional attention to detail, animations, and best practices.'
        ];

        const prompt = `Convert this design mockup into production-ready ${framework} code using ${style === 'tailwind' ? 'Tailwind CSS' : 'inline CSS'}.

${qualityPrompts[quality - 1] || qualityPrompts[1]}

Requirements:
- Generate ONLY the code, no explanations or markdown
- Make it responsive and accessible
- Use modern best practices
- Include all necessary imports
- Use semantic HTML
- Ensure pixel-perfect implementation
${framework === 'react' ? '- Create a functional component with hooks if needed' : ''}
${framework === 'vue' ? '- Create a Vue 3 composition API component' : ''}
${framework === 'html' ? '- Create standalone HTML with embedded CSS and vanilla JavaScript' : ''}

Return ONLY the code.`;

        const msg = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20240620',
            max_tokens: quality === 3 ? 8000 : quality === 2 ? 4000 : 2000,
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'image',
                            source: {
                                type: 'base64',
                                media_type: image.startsWith('data:') ? image.split(';')[0].split(':')[1] : 'image/png',
                                data: image.includes(',') ? image.split(',')[1] : image,
                            },
                        },
                        {
                            type: 'text',
                            text: prompt,
                        },
                    ],
                },
            ],
        });

        // Extract text content from the response
        const contentCheck = msg.content[0];
        if (contentCheck.type === 'text') {
            return NextResponse.json({ content: contentCheck.text });
        } else {
            return NextResponse.json({ error: 'Unexpected response format from Anthropic' }, { status: 500 });
        }

    } catch (error) {
        console.error('Error generating code:', error);
        return NextResponse.json(
            { error: 'Failed to generate code', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
