import { createDirectus, rest, readItems, readSingleton } from '@directus/sdk';
import { slugify } from '../utils/slugify';

type Global = {
    title: string;
    description: string;
    email: string;
};

type Page = {
    title: string;
    slug: string;
    content: string;
    mainImg: string;
    sideImg: string;
    Category: Category;
};

type Category = {
    title: string;
    slug: string;
    description: string;
    pages: Page[];
};

type Schema = {
    global: Global;
    categories: Category[];
    pages: Page[];
};

const client = createDirectus<Schema>('https://admin.sickelink.com/').with(rest());

export async function getPages() {
    try {
        const pages = await client.request(readItems('pages'));
        if (!pages) {
            console.error(' No data received from Directus');
            return [];
        }
        return pages.map(page => ({
            ...page,
            slug: slugify(page.title)
        }));
    } catch (error) {
        console.error(' Error fetching pages:', error);
        return [];
    }
}

export async function getCategories() {
    try {
        const categories = await client.request(readItems('categories'));
        if (!categories) {
            console.error(' No data received from Directus');
            return [];
        }

        return categories.map(category => ({
            ...category,
            slug: slugify(category.title)
        }));
    } catch (error) {
        console.error(' Error fetching categories: ', error);
        return [];
    }
}

export async function getGlobal() {
    try {
        const global = await client.request(readSingleton('global'));
        console.log(global);
        return global;
    } catch (error) {
        console.error(' Error fetching global: ', error);
        return null;
    }
}

export { client as default };