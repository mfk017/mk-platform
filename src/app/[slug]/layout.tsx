import { Metadata } from 'next';
import { db } from '@/lib/db';

type Props = {
  params: { slug: string }
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const slug = params.slug;
  const center = await db.center.findUnique({
    where: { slug }
  });

  if (!center) {
    return {
      title: 'Not Found | Center',
    };
  }

  return {
    title: `${center.name_ar} | ${center.name_en}`,
    description: center.description_en || 'Book certified riding lessons, horse stabling, and equestrian experiences.',
  };
}

export default function CenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
