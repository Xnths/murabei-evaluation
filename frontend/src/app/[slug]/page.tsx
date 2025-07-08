interface BookPageProps {
  params: {
    slug: string;
  };
}

export default async function BookPage({ params: { slug } }: BookPageProps) {
  return <div>{slug}</div>;
}
