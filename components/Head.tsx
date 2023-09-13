import Head from "next/head";

interface Props {
  title: string;
}

export default function HeadURL({ title }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={title} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
