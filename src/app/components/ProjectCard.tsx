import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Project } from '../data/projects';
import { memo } from 'react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = memo(function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div 
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-default)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        height: '100%',
        willChange: 'transform'
      }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
        transition: { duration: 0.2, ease: "easeOut" }
      }}
    >
      {/* Image on Top - Vertical aspect ratio */}
      <div className="relative overflow-hidden" style={{ height: '320px' }}>
        <motion.div 
          className="w-full h-full relative"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          {/* Animated overlay on hover */}
          <motion.div 
            className="absolute inset-0 z-10"
            style={{ 
              background: 'linear-gradient(180deg, transparent 0%, rgba(30, 64, 175, 0.15) 100%)',
              opacity: 0,
              pointerEvents: 'none'
            }}
          />
          
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />
          
          {/* Category badge on image */}
          <motion.div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-lg z-30"
            style={{
              backgroundColor: 'transparent',
              backdropFilter: 'blur(8px)',
              border: '2px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-xs" style={{ color: 'white', fontWeight: 600 }}>
              {project.category}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Content Below Image */}
      <div className="p-6 flex flex-col flex-1">
        {/* Meta information */}
        <div className="flex items-center gap-3 flex-wrap mb-3">
          <p 
            className="text-xs uppercase tracking-wide"
            style={{ color: 'var(--text-secondary)', fontWeight: 500 }}
          >
            {project.domain}
          </p>
        </div>

        {/* Title - Only this is clickable */}
        <Link
          to={`/case-study/${project.id}`}
          style={{ textDecoration: 'none' }}
        >
          <h3 
            className="text-2xl mb-3 hover:underline underline-offset-4 decoration-2 transition-all duration-200 cursor-pointer"
            style={{ 
              color: 'var(--text-primary)', 
              fontWeight: 600,
              lineHeight: 1.3
            }}
          >
            {project.title}
          </h3>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs"
              style={{
                backgroundColor: 'var(--gradient-secondary)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-default)',
                fontWeight: 500
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Role & Year Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className="px-3 py-1.5 rounded-lg text-xs"
            style={{
              backgroundColor: 'var(--accent-blue)',
              color: 'white',
              fontWeight: 600
            }}
          >
            {project.role}
          </span>
          <span
            className="px-3 py-1.5 rounded-lg text-xs"
            style={{
              backgroundColor: 'var(--gradient-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-default)',
              fontWeight: 600
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Context and Responsibility */}
        <div 
          className="p-5 rounded-xl"
          style={{
            backgroundColor: 'var(--gradient-secondary)',
            border: '1px solid var(--border-default)',
          }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm mb-2" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Context</h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{project.context}</p>
            </div>
            <div>
              <h4 className="text-sm mb-2" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Responsibility</h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{project.responsibility}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
