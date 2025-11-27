import React from 'react';

const instructors = [
  {
    name: "Sarah Jenkins",
    role: "Senior UX Designer at Google",
    bio: "Passionate about accessible design and building intuitive user interfaces.",
    tags: ["Figma", "UX Research", "Prototyping"],
    initials: "SJ",
    color: "bg-purple-100 text-purple-600"
  },
  {
    name: "David Chen",
    role: "Lead Backend Engineer at Spotify",
    bio: "Specializes in scalable systems, microservices, and cloud architecture.",
    tags: ["Python", "AWS", "System Design"],
    initials: "DC",
    color: "bg-blue-100 text-blue-600"
  },
  {
    name: "Elena Rodriguez",
    role: "Data Scientist at Netflix",
    bio: "Turning raw data into actionable insights through storytelling and ML.",
    tags: ["Data Viz", "Pandas", "Statistics"],
    initials: "ER",
    color: "bg-green-100 text-green-600"
  }
];

const testimonials = [
  {
    name: "Michael T.",
    role: "Frontend Developer",
    quote: "EduWave gave me the structure I couldn't find in random YouTube tutorials. I landed my first junior role 3 months after finishing the React track.",
    stars: 5
  },
  {
    name: "Priya K.",
    role: "Product Manager",
    quote: "The flexible schedule allowed me to upskill while working full-time. The mentor feedback on my capstone project was invaluable.",
    stars: 5
  }
];

const InstructorsSection: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-3">Learn from Industry Experts</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Our instructors don't just teach—they build the tools you use every day.
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {instructors.map((instructor, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${instructor.color}`}>
                  {instructor.initials}
                </div>
                <div>
                  <h3 className="font-bold text-dark text-lg">{instructor.name}</h3>
                  <p className="text-primary text-sm font-medium">{instructor.role}</p>
                </div>
              </div>
              <p className="text-muted text-sm leading-relaxed mb-4">
                {instructor.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {instructor.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-gray-50 text-xs font-medium text-gray-600 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Divider/Section */}
        <div className="border-t border-gray-100 pt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-dark mb-2">Student Success Stories</h3>
            <p className="text-muted">Join thousands of students who changed their careers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-[#F9FAFB] rounded-xl p-6 md:p-8 relative">
                {/* Quote Icon */}
                <span className="absolute top-6 left-6 text-4xl text-blue-100 font-serif leading-none">"</span>
                
                <div className="relative z-10 pl-4">
                  <p className="text-dark font-medium italic text-lg mb-6 opacity-90">
                    {t.quote}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-dark">{t.name}</h4>
                      <p className="text-sm text-muted">{t.role}</p>
                    </div>
                    <div className="flex text-yellow-400 gap-0.5">
                      {[...Array(t.stars)].map((_, i) => (
                        <span key={i} className="text-lg">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default InstructorsSection;