import { map } from '@/.map'
import { create } from '@/components/ui/icon'
import { icons } from 'lucide-react'
import { createMDXSource, defaultSchemas } from 'next-docs-mdx'
import { InferMetaType, InferPageType, loader } from 'next-docs-zeta/source'
import { z } from 'zod'

export const grammar = loader({
	baseUrl: '/dashboard/grammar',
	rootDir: 'grammar',
	icon(iconName) {
		if (iconName && iconName in icons) {
			return create({ icon: icons[iconName as keyof typeof icons] })
		}
	},
	source: createMDXSource(map, {
		schema: {
			frontmatter: defaultSchemas.frontmatter.extend({
				preview: z.string().optional(),
				index: z.boolean().default(false),
				published: z.boolean().default(true),
				sortedNumber: z.number().optional(),
				keywords: z.array(z.string()).optional(),
				createdAt: z.string().date().or(z.date()).optional(),
				updatedAt: z.string().date().or(z.date()).optional(),
			}),
		},
	}),
})

export type Page = InferPageType<typeof grammar>
export type Meta = InferMetaType<typeof grammar>
