export interface Prompt {
  id: string;
  title: string;
  promptText: string;
  category: string;
  subCategory: string;
  aiModel: string;
  useCase: string;
  status: "active" | "draft" | "archived" | "favorite";
  priority: "high" | "medium" | "low";
  rating: number;
  formatType: "fill-in-blank" | "question-based" | "example-based";
  collection: string;
  notes?: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  promptCount: number;
  categoryCount: number;
  color: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  promptCount: number;
  icon: string;
  subCategories?: string[];
}

export const collections: Collection[] = [
  {
    id: "chatgpt-bible",
    name: "The Ultimate ChatGPT Bible 2.0",
    description: "Master ChatGPT with 500+ prompts across 19 categories covering everything from career to creativity.",
    promptCount: 520,
    categoryCount: 19,
    color: "collection-chatgpt",
    icon: "🧠",
  },
  {
    id: "marketer-bible",
    name: "The Marketer's Bible",
    description: "Complete marketing toolkit with prompts for Email, Facebook, YouTube, SEO, LinkedIn, TikTok & more.",
    promptCount: 450,
    categoryCount: 17,
    color: "collection-marketer",
    icon: "📈",
  },
  {
    id: "business-bible",
    name: "The Business Owner's Bible",
    description: "Scale your business with 35+ sections covering Growth, HR, Operations, Legal, Finance & Sales.",
    promptCount: 680,
    categoryCount: 35,
    color: "collection-business",
    icon: "💼",
  },
  {
    id: "coach-bible",
    name: "The Coach's Bible",
    description: "Transform lives with prompts for coaching sessions, client management, and personal development.",
    promptCount: 180,
    categoryCount: 12,
    color: "collection-coach",
    icon: "🎯",
  },
  {
    id: "growth-bible",
    name: "The Personal Growth Bible",
    description: "Unlock your potential with prompts for mindset, habits, goals, and self-improvement.",
    promptCount: 170,
    categoryCount: 10,
    color: "collection-growth",
    icon: "🌱",
  },
];

// New functional categories based on prompt content
export const categories: Category[] = [
  { 
    id: "marketing-advertising", 
    name: "Marketing & Advertising", 
    promptCount: 187, 
    icon: "📢",
    subCategories: ["Brand Awareness", "Campaigns", "Ads", "Promotions"] 
  },
  { 
    id: "seo-content-strategy", 
    name: "SEO & Content Strategy", 
    promptCount: 145, 
    icon: "🔍",
    subCategories: ["Keyword Research", "Content Planning", "Analytics", "Optimization"] 
  },
  { 
    id: "email-copywriting", 
    name: "Email & Copywriting", 
    promptCount: 134, 
    icon: "✉️",
    subCategories: ["Email Campaigns", "Subject Lines", "Sales Copy", "Persuasive Writing"] 
  },
  { 
    id: "social-media", 
    name: "Social Media Management", 
    promptCount: 198, 
    icon: "📱",
    subCategories: ["Platform Content", "Community Engagement", "Posting Strategies", "Analytics"] 
  },
  { 
    id: "business-strategy", 
    name: "Business Strategy & Planning", 
    promptCount: 156, 
    icon: "📊",
    subCategories: ["Business Models", "SWOT Analysis", "Competitive Analysis", "Growth Planning"] 
  },
  { 
    id: "sales-leads", 
    name: "Sales & Lead Generation", 
    promptCount: 167, 
    icon: "💰",
    subCategories: ["Sales Scripts", "Lead Nurturing", "Proposals", "Conversion Optimization"] 
  },
  { 
    id: "product-development", 
    name: "Product Development & Innovation", 
    promptCount: 89, 
    icon: "🚀",
    subCategories: ["MVP Creation", "Product Launches", "Market Research", "Ideation"] 
  },
  { 
    id: "hr-talent", 
    name: "HR & Talent Management", 
    promptCount: 112, 
    icon: "👥",
    subCategories: ["Hiring", "Job Descriptions", "Performance Reviews", "Employee Communication"] 
  },
  { 
    id: "operations-process", 
    name: "Operations & Process", 
    promptCount: 98, 
    icon: "⚙️",
    subCategories: ["Workflows", "SOPs", "Project Management", "Resource Allocation"] 
  },
  { 
    id: "finance-budgeting", 
    name: "Finance & Budgeting", 
    promptCount: 76, 
    icon: "💵",
    subCategories: ["Financial Planning", "Budgets", "Forecasting", "Expense Tracking"] 
  },
  { 
    id: "legal-compliance", 
    name: "Legal & Compliance", 
    promptCount: 54, 
    icon: "⚖️",
    subCategories: ["Contracts", "Policies", "Terms of Service", "Privacy"] 
  },
  { 
    id: "customer-service", 
    name: "Customer Service & Support", 
    promptCount: 123, 
    icon: "🎧",
    subCategories: ["FAQs", "Customer Communication", "Retention", "Feedback"] 
  },
  { 
    id: "coding-engineering", 
    name: "Coding & Engineering", 
    promptCount: 145, 
    icon: "💻",
    subCategories: ["Programming", "Debugging", "Technical Docs", "Architecture"] 
  },
  { 
    id: "creative-writing", 
    name: "Creative Writing & Storytelling", 
    promptCount: 134, 
    icon: "✨",
    subCategories: ["Fiction", "Poetry", "Character Development", "Narrative"] 
  },
  { 
    id: "professional-writing", 
    name: "Professional Writing & Communication", 
    promptCount: 98, 
    icon: "📝",
    subCategories: ["Business Writing", "Reports", "Presentations", "Professional Development"] 
  },
  { 
    id: "learning-education", 
    name: "Learning & Education", 
    promptCount: 156, 
    icon: "🎓",
    subCategories: ["Course Creation", "Lesson Plans", "Teaching Strategies", "Student Engagement"] 
  },
  { 
    id: "personal-development", 
    name: "Personal Development & Coaching", 
    promptCount: 145, 
    icon: "🌟",
    subCategories: ["Goal Setting", "Self-Improvement", "Life Coaching", "Reflection"] 
  },
  { 
    id: "productivity", 
    name: "Productivity & Time Management", 
    promptCount: 87, 
    icon: "⏱️",
    subCategories: ["Task Organization", "Calendars", "Efficiency", "Workflows"] 
  },
  { 
    id: "data-research", 
    name: "Data Analysis & Research", 
    promptCount: 78, 
    icon: "📈",
    subCategories: ["Data Interpretation", "Research Methods", "Insights", "Reporting"] 
  },
  { 
    id: "design-visual", 
    name: "Design & Visual Content", 
    promptCount: 118, 
    icon: "🎨",
    subCategories: ["Graphic Design", "UI/UX", "Visual Strategy", "Mood Boards"] 
  },
];

export const formatTypes = [
  { id: "fill-in-blank", name: "Fill-in-the-Blank", description: "Prompts with [placeholders] to customize" },
  { id: "question-based", name: "Question-Based", description: "Prompts structured as questions" },
  { id: "example-based", name: "Example-Based", description: "Prompts with examples to follow" },
];

export const aiModels = [
  { id: "chatgpt", name: "ChatGPT", icon: "🤖" },
  { id: "claude", name: "Claude", icon: "🧠" },
  { id: "midjourney", name: "Midjourney", icon: "🎨" },
  { id: "dalle", name: "DALL-E", icon: "🖼️" },
  { id: "gemini", name: "Gemini", icon: "✨" },
  { id: "universal", name: "Universal", icon: "🌐" },
];

export const useCases = [
  "Business",
  "Creative",
  "Learning",
  "Technical",
  "Personal",
  "Marketing",
  "Writing",
];

export const samplePrompts: Prompt[] = [
  {
    id: "1",
    title: "Professional Bio Generator",
    promptText: "Write a compelling professional bio for [NAME], who works as a [JOB_TITLE] at [COMPANY]. Include their [NUMBER] years of experience, key achievements in [INDUSTRY], and their passion for [INTEREST]. The bio should be [WORD_COUNT] words and suitable for [PLATFORM].",
    category: "Professional Writing & Communication",
    subCategory: "Personal Branding",
    aiModel: "ChatGPT",
    useCase: "Business",
    status: "active",
    priority: "high",
    rating: 5,
    formatType: "fill-in-blank",
    collection: "chatgpt-bible",
    notes: "Great for LinkedIn, company websites, and speaking engagements.",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-10",
  },
  {
    id: "2",
    title: "Email Subject Line Optimizer",
    promptText: "Generate 10 compelling email subject lines for a [INDUSTRY] company promoting [PRODUCT/SERVICE]. The target audience is [AUDIENCE_DESCRIPTION]. Include a mix of: curiosity-driven, benefit-focused, and urgency-based subject lines. Keep each under 50 characters.",
    category: "Email & Copywriting",
    subCategory: "Subject Lines",
    aiModel: "ChatGPT",
    useCase: "Marketing",
    status: "favorite",
    priority: "high",
    rating: 5,
    formatType: "fill-in-blank",
    collection: "marketer-bible",
    createdAt: "2024-02-01",
    updatedAt: "2024-03-12",
  },
  {
    id: "3",
    title: "Business SWOT Analysis",
    promptText: "Conduct a comprehensive SWOT analysis for [COMPANY_NAME], a [BUSINESS_TYPE] operating in [MARKET/LOCATION]. Consider current market trends, competitive landscape, and internal capabilities. Format the analysis with clear sections and actionable insights.",
    category: "Business Strategy & Planning",
    subCategory: "Analysis",
    aiModel: "ChatGPT",
    useCase: "Business",
    status: "active",
    priority: "medium",
    rating: 4,
    formatType: "fill-in-blank",
    collection: "business-bible",
    createdAt: "2024-01-20",
    updatedAt: "2024-02-28",
  },
  {
    id: "4",
    title: "Coaching Session Framework",
    promptText: "Create a structured coaching session outline for a client working on [GOAL]. Include: opening questions to assess current state, exploration prompts for obstacles, action-oriented questions for next steps, and accountability measures. Session duration: [DURATION] minutes.",
    category: "Personal Development & Coaching",
    subCategory: "Session Planning",
    aiModel: "ChatGPT",
    useCase: "Personal",
    status: "active",
    priority: "high",
    rating: 5,
    formatType: "fill-in-blank",
    collection: "coach-bible",
    createdAt: "2024-02-10",
    updatedAt: "2024-03-05",
  },
  {
    id: "5",
    title: "Daily Reflection Journal Prompts",
    promptText: "What are 3 things I'm grateful for today? What challenge did I overcome and what did it teach me? What's one thing I could have done better? What's my intention for tomorrow?",
    category: "Personal Development & Coaching",
    subCategory: "Journaling",
    aiModel: "Universal",
    useCase: "Personal",
    status: "active",
    priority: "medium",
    rating: 4,
    formatType: "question-based",
    collection: "growth-bible",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05",
  },
  {
    id: "6",
    title: "LinkedIn Post Generator",
    promptText: "Write a LinkedIn post about [TOPIC] that showcases thought leadership. Use the hook-story-insight framework: Start with an attention-grabbing first line, share a relevant personal experience or case study, and end with actionable takeaways. Include relevant hashtags.",
    category: "Social Media Management",
    subCategory: "LinkedIn",
    aiModel: "ChatGPT",
    useCase: "Marketing",
    status: "active",
    priority: "high",
    rating: 5,
    formatType: "fill-in-blank",
    collection: "marketer-bible",
    createdAt: "2024-02-15",
    updatedAt: "2024-03-08",
  },
  {
    id: "7",
    title: "Product Description Writer",
    promptText: "Write a compelling product description for [PRODUCT_NAME], a [PRODUCT_TYPE] designed for [TARGET_AUDIENCE]. Highlight the key features: [FEATURE_1], [FEATURE_2], [FEATURE_3]. Include benefits, use cases, and a strong call-to-action. Tone: [BRAND_VOICE].",
    category: "Email & Copywriting",
    subCategory: "Sales Copy",
    aiModel: "ChatGPT",
    useCase: "Business",
    status: "active",
    priority: "medium",
    rating: 4,
    formatType: "fill-in-blank",
    collection: "chatgpt-bible",
    createdAt: "2024-01-25",
    updatedAt: "2024-02-20",
  },
  {
    id: "8",
    title: "SEO Blog Post Outline",
    promptText: "Create a comprehensive blog post outline targeting the keyword [PRIMARY_KEYWORD]. Include: H1 title options, H2 subheadings, key points for each section, internal linking opportunities, and a meta description. Target word count: [WORD_COUNT].",
    category: "SEO & Content Strategy",
    subCategory: "Content Planning",
    aiModel: "ChatGPT",
    useCase: "Marketing",
    status: "active",
    priority: "high",
    rating: 5,
    formatType: "fill-in-blank",
    collection: "marketer-bible",
    createdAt: "2024-02-05",
    updatedAt: "2024-03-01",
  },
];

export const learningResources = [
  { id: "1", title: "Getting Started Guide", description: "Learn the basics of effective prompting", duration: "10 min", type: "guide" },
  { id: "2", title: "ChatGPT 4.5 Complete Guide", description: "Master the latest ChatGPT features", duration: "25 min", type: "guide" },
  { id: "3", title: "Image Creation Tutorial", description: "Create stunning images with AI", duration: "15 min", type: "tutorial" },
  { id: "4", title: "Mastering ChatGPT", description: "Advanced techniques for power users", duration: "30 min", type: "course" },
  { id: "5", title: "13 Types of Prompts", description: "Understand different prompt formats", duration: "20 min", type: "guide" },
  { id: "6", title: "Fill-in-Blank vs Open-Ended", description: "When to use each prompt type", duration: "12 min", type: "guide" },
  { id: "7", title: "Free Copywriting Course", description: "13 video masterclass on AI copywriting", duration: "2 hours", type: "course" },
];
