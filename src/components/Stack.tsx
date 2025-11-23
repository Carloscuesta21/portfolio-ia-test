import React from 'react';

const techs = [
    "OpenAI", "Make", "Zapier", "Claude 3.5", "Midjourney", "Notion API", "Airtable", "Softr", "n8n", "Perplexity", "Typeform", "Stripe API", "Vapi", "Retell AI"
];

const Stack: React.FC = () => {
    return (
        <section className="py-8 border-y border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10"></div>
            
            <div className="flex w-full">
                <div className="flex animate-marquee whitespace-nowrap py-2">
                    {techs.concat(techs).map((tech, index) => (
                        <span key={index} className="mx-8 text-lg font-mono font-medium text-slate-500 opacity-50 hover:opacity-100 hover:text-primary transition-all cursor-default uppercase tracking-widest flex items-center group">
                            <span className="w-1.5 h-1.5 bg-slate-700 group-hover:bg-primary rounded-full mr-4 inline-block transition-colors"></span>
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="flex animate-marquee whitespace-nowrap py-2 absolute top-0 left-full">
                    {techs.concat(techs).map((tech, index) => (
                        <span key={`clone-${index}`} className="mx-8 text-lg font-mono font-medium text-slate-500 opacity-50 hover:opacity-100 hover:text-primary transition-all cursor-default uppercase tracking-widest flex items-center group">
                            <span className="w-1.5 h-1.5 bg-slate-700 group-hover:bg-primary rounded-full mr-4 inline-block transition-colors"></span>
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stack;
