import createNextDocsMDX from 'next-docs-mdx/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

const withMDX = createNextDocsMDX({
	options: {
		rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
	},
})

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: false,
	images: {
		domains: ['picsum.photos', 'simg-ssl.duolingo.com'],
	},
}

export default withMDX(config)
