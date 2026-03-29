export function Process() {
  return (
    <div 
      className="min-h-screen pb-16"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Philosophy */}
      <section 
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-6xl" style={{ color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em' }}>Process & Approach</h1>
          <div className="space-y-4 max-w-3xl">
            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
              Design is problem-solving. My process balances user needs, business constraints, and technical feasibility to deliver meaningful outcomes.
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Every project is different, but my approach remains consistent: understand deeply, design intentionally, validate rigorously.
            </p>
          </div>
        </div>
      </section>

      {/* End-to-End Process */}
      <section 
        className="max-w-7xl mx-auto px-6 py-16 border-t"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <div className="space-y-16">
          <h2 className="text-3xl" style={{ color: 'var(--text-primary)' }}>End-to-End Process</h2>
          
          <div className="space-y-16">
            {/* Discovery */}
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{ 
                      backgroundColor: 'var(--accent-blue)',
                      color: 'white'
                    }}
                  >
                    1
                  </div>
                  <h3 className="text-2xl" style={{ color: 'var(--text-primary)' }}>Discovery</h3>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <p style={{ color: 'var(--text-primary)' }}>
                  Start by understanding the problem space through stakeholder interviews, user research, and competitive analysis.
                </p>
                <ul className="space-y-2" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex gap-2"><span>•</span> Stakeholder interviews to align on goals</li>
                  <li className="flex gap-2"><span>•</span> User interviews and contextual inquiry</li>
                  <li className="flex gap-2"><span>•</span> Competitive analysis and market research</li>
                  <li className="flex gap-2"><span>•</span> Analytics review and data synthesis</li>
                </ul>
              </div>
            </div>

            {/* Definition */}
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{ 
                      backgroundColor: 'var(--accent-blue)',
                      color: 'white'
                    }}
                  >
                    2
                  </div>
                  <h3 className="text-2xl" style={{ color: 'var(--text-primary)' }}>Definition</h3>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <p style={{ color: 'var(--text-primary)' }}>
                  Synthesize research into clear problem statements, user needs, and success metrics.
                </p>
                <ul className="space-y-2" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex gap-2"><span>•</span> Problem statement and hypothesis</li>
                  <li className="flex gap-2"><span>•</span> User journey mapping</li>
                  <li className="flex gap-2"><span>•</span> Success metrics definition</li>
                  <li className="flex gap-2"><span>•</span> Scope and prioritization</li>
                </ul>
              </div>
            </div>

            {/* Design */}
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{ 
                      backgroundColor: 'var(--accent-blue)',
                      color: 'white'
                    }}
                  >
                    3
                  </div>
                  <h3 className="text-2xl" style={{ color: 'var(--text-primary)' }}>Design</h3>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <p style={{ color: 'var(--text-primary)' }}>
                  Create solutions through iterative exploration, from lo-fi concepts to high-fidelity designs.
                </p>
                <ul className="space-y-2" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex gap-2"><span>•</span> Information architecture and user flows</li>
                  <li className="flex gap-2"><span>•</span> Lo-fi wireframes and concepts</li>
                  <li className="flex gap-2"><span>•</span> Design system components</li>
                  <li className="flex gap-2"><span>•</span> High-fidelity UI and prototypes</li>
                </ul>
              </div>
            </div>

            {/* Validation */}
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{ 
                      backgroundColor: 'var(--accent-blue)',
                      color: 'white'
                    }}
                  >
                    4
                  </div>
                  <h3 className="text-2xl" style={{ color: 'var(--text-primary)' }}>Validation</h3>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <p style={{ color: 'var(--text-primary)' }}>
                  Test assumptions and iterate based on user feedback and data.
                </p>
                <ul className="space-y-2" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex gap-2"><span>•</span> Usability testing (moderated and unmoderated)</li>
                  <li className="flex gap-2"><span>•</span> A/B testing strategy</li>
                  <li className="flex gap-2"><span>•</span> Stakeholder reviews and feedback</li>
                  <li className="flex gap-2"><span>•</span> Iterate based on findings</li>
                </ul>
              </div>
            </div>

            {/* Delivery */}
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{ 
                      backgroundColor: 'var(--accent-blue)',
                      color: 'white'
                    }}
                  >
                    5
                  </div>
                  <h3 className="text-2xl" style={{ color: 'var(--text-primary)' }}>Delivery</h3>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <p style={{ color: 'var(--text-primary)' }}>
                  Collaborate with engineering to ensure high-quality implementation and measure impact.
                </p>
                <ul className="space-y-2" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex gap-2"><span>•</span> Developer handoff and documentation</li>
                  <li className="flex gap-2"><span>•</span> Implementation support and QA</li>
                  <li className="flex gap-2"><span>•</span> Launch strategy and rollout</li>
                  <li className="flex gap-2"><span>•</span> Post-launch measurement and iteration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section 
        className="max-w-7xl mx-auto px-6 py-16 border-t"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <div className="space-y-12">
          <h2 className="text-3xl" style={{ color: 'var(--text-primary)' }}>Collaboration</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl" style={{ color: 'var(--text-primary)' }}>Product Managers</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Partner on strategy, prioritization, and roadmap planning. Translate business goals into design opportunities.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl" style={{ color: 'var(--text-primary)' }}>Engineers</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Early collaboration on feasibility, implementation details, and technical constraints. Support during development.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl" style={{ color: 'var(--text-primary)' }}>Stakeholders</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Facilitate alignment through workshops, presentations, and regular check-ins. Communicate design rationale clearly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design System Thinking */}
      <section 
        className="max-w-7xl mx-auto px-6 py-16 border-t"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <div className="space-y-12">
          <h2 className="text-3xl" style={{ color: 'var(--text-primary)' }}>Design System Thinking</h2>
          
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl mb-2" style={{ color: 'var(--text-primary)' }}>Scalability</h3>
              </div>
              <div className="md:col-span-2">
                <p style={{ color: 'var(--text-secondary)' }}>
                  Build reusable components and patterns that scale across features and products. Focus on flexibility without complexity.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl mb-2" style={{ color: 'var(--text-primary)' }}>Consistency</h3>
              </div>
              <div className="md:col-span-2">
                <p style={{ color: 'var(--text-secondary)' }}>
                  Maintain consistent interaction patterns, visual language, and user experience across all touchpoints.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl mb-2" style={{ color: 'var(--text-primary)' }}>Documentation</h3>
              </div>
              <div className="md:col-span-2">
                <p style={{ color: 'var(--text-secondary)' }}>
                  Create clear guidelines for when and how to use components. Document design decisions and rationale for future reference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Me Senior */}
      <section 
        className="max-w-7xl mx-auto px-6 py-16 border-t"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <div className="space-y-12">
          <h2 className="text-3xl" style={{ color: 'var(--text-primary)' }}>Senior-Level Capabilities</h2>
          
          <div className="space-y-6" style={{ color: 'var(--text-secondary)' }}>
            <div className="flex gap-4">
              <span className="shrink-0">→</span>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Strategic thinking:</strong> Connect design decisions to business outcomes and user value
              </p>
            </div>
            <div className="flex gap-4">
              <span className="shrink-0">→</span>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Ambiguity navigation:</strong> Define problems and scope when requirements are unclear
              </p>
            </div>
            <div className="flex gap-4">
              <span className="shrink-0">→</span>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Cross-functional leadership:</strong> Facilitate alignment across product, engineering, and business teams
              </p>
            </div>
            <div className="flex gap-4">
              <span className="shrink-0">→</span>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Systems thinking:</strong> Design scalable solutions that work across multiple features and contexts
              </p>
            </div>
            <div className="flex gap-4">
              <span className="shrink-0">→</span>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Data-informed decisions:</strong> Balance quantitative metrics with qualitative insights
              </p>
            </div>
            <div className="flex gap-4">
              <span className="shrink-0">→</span>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Mentorship:</strong> Elevate team capabilities through feedback, critique, and knowledge sharing
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}