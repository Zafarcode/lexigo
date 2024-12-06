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
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				port: '',
				pathname: '/**',
			},
		],
	},
}

export default withMDX(config)
