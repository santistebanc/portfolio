// Career Desk publishes only reviewed public content here; private profile data stays outside this repo.
import * as base from './base-content'
import publicContent from './career-content.json'

const content = publicContent as Partial<typeof base>
export const person = { ...base.person, ...content.person }
export const boardRows = content.boardRows ?? base.boardRows
export const workIntro = content.workIntro ?? base.workIntro
export const aiIntro = content.aiIntro ?? base.aiIntro
export const aiSteps = content.aiSteps ?? base.aiSteps
export const highlights = { ...base.highlights, ...content.highlights }
export const education = { ...base.education, ...content.education }
export const cta = { ...base.cta, ...content.cta }
export const featuredProject = { ...base.featuredProject, ...content.featuredProject }
export const projects = content.projects ?? base.projects
export const otherProjects = content.otherProjects ?? base.otherProjects
export const skills = content.skills ?? base.skills
export const experience = content.experience ?? base.experience
export const sections = base.sections
export const cvMain = base.cvMain
