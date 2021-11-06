import React from 'react';
import { allPageLayouts, config } from '.contentlayer/data';
import { getComponent } from '@stackbit/components';

function Page(props) {
    console.log({ props });
    const { page, site } = props;
    const { type } = page;

    if (!type) {
        throw new Error(`page has no layout, page '${props.path}'`);
    }
    const PageLayout = getComponent(type);
    if (!PageLayout) {
        throw new Error(`no page layout matching the layout: ${type}`);
    }
    return <PageLayout page={page} site={site} />;
}

export async function getStaticPaths() {
    const paths = allPageLayouts.map((_) => ({ params: { slug: _.path.split('/') } }));
    console.log(JSON.stringify({ paths }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    // const props = await sourcebitDataClient.getStaticPropsForPageAtPath(params.slug);
    console.log({ params });
    const pagePath = params.slug?.join('/') ?? '';
    const page = allPageLayouts.find((_) => _.path === pagePath);
    const props = { page, site: config };
    return { props };
}

export default Page;
