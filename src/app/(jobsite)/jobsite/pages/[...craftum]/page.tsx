import * as cheerio from 'cheerio';
import { DynamicCraftumHtml } from './_DynamicCraftumHtml';
import { notFound } from 'next/navigation';


interface PageProps {
  params: Promise<{
    craftum: string[];
  }>;
}

const fetchPage = async (path: string) => {
  // https://ro3596.craftum.io/About
  // const baseUrl = 'https://qa6302.craftum.io'
  const baseUrl = 'https://ro3596.craftum.io'//ilia site
  const page = await fetch(
    `${baseUrl}/${path}`, { next: { revalidate: 5 } }
  )
    .then((res) => res.text())

  const $ = cheerio.load(page);

  //check the page's title, if it contains "страница не найдена" redirect to notFound page
  const titleText = $('title').text().trim()
  if (titleText.toLowerCase().includes('страница не найдена')) {
    notFound()
  }

  // get styles
  const styles = $('link[rel="stylesheet"]')
    .map((_, el) => `${baseUrl}${$(el).attr('href')}`)
    .get();

  const staticCss = await Promise.all(styles.map(item => fetch(item).then(res => res.text())))

  const contentBlock = $('div[data-blocks-wrapper]');
  // remove all the scripts from the block
  contentBlock.find('script').remove();

  const cleanContent = contentBlock.html();
  return {
    css: staticCss,
    html: cleanContent,
  }
}

export default async function CraftumPage({ params }: PageProps) {
  const segments = await params
  const path = segments.craftum.join('/')

  const { css, html } = await fetchPage(path)
  return (
    < >
      {css.map((css, i) => (
        <style key={i} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      <DynamicCraftumHtml html={html || ''} />
    </>
  )
}
