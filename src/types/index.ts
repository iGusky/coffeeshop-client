import {z} from 'astro:content'

const ImageSchema = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number()
})

const FeatureImagesSchema = z.object({
    thumbnail: ImageSchema,
    medium: ImageSchema,
    medium_large: ImageSchema,
    large: ImageSchema,
    full: ImageSchema,
}) 

export const BaseWPSchema = z.object({
    id: z.number(),
    slug: z.string(),
    title: z.object({
        rendered: z.string()
    }),
    content: z.object({
        rendered: z.string()
    }),
    acf: z.object({
        subtitle: z.string()
    }),
    featured_images: FeatureImagesSchema
})

const GallerySchema = z.object({
    large: ImageSchema,
    full: ImageSchema
})

export const GalleryPageSchema = BaseWPSchema.extend({
    gallery: z.array(GallerySchema)
})

const ProcessSchema = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
})

export const ProcessPageSchema = BaseWPSchema.extend({
    acf: z.object({
        subtitle: z.string(),
    }).catchall(ProcessSchema)
})

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string()
})

export const CategoriesSlugSchema = z.array(CategorySchema.pick({slug: true}))

const CategoriesSchema = z.array(CategorySchema)

// omit() va a ignorar los campos que se encuentren en la base 
// generando un nuevo schema sin esos campos.
// Su contraparte (seleccionar solo algunos campos) es pick().
export const PostSchema = BaseWPSchema.omit({
    acf: true
}).extend({
    date: z.string(),
    category_details: CategoriesSchema
})

export const PostsSchema = z.array(PostSchema)

export const MenuItemSchema = BaseWPSchema.pick({
    title: true,
    featured_images: true
}).extend({
   acf: z.object({
        description: z.string(),
        price: z.coerce.number()
   })
})
export const MenuItemsSchema = z.array(MenuItemSchema)

export const MarkerSchema = z.object({
    label: z.string(),
    lat: z.number(),
    lng: z.number()
})

export const LocationSchema = z.object({
    lat: z.number(),
    lng: z.number(),
    zoom: z.number(),
    markers: z.array(MarkerSchema)
})

export const ContactPageSchema = BaseWPSchema.extend({
    acf: z.object({
        subtitle: z.string()
    }).catchall(LocationSchema)
})

// Generar un type en base a un schema de zod
export type Post = z.infer<typeof PostSchema>
export type Gallery = z.infer<typeof GallerySchema>
export type FeaturedImages = z.infer<typeof FeatureImagesSchema>
export type Location = z.infer<typeof LocationSchema>