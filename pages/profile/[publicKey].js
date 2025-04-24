import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import AppLayout from '../../components/UI/AppLayout';
import ErrorComponent from '../../components/UI/ErrorComponent';

const NFTGallery = dynamic(() => import('../../components/Profile/NFTGallery'), {
  ssr: false,
  loading: () => <div>Loading NFTs...</div>
});

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  try {
    if (!params?.publicKey) {
      return {
        notFound: true
      };
    }
    return {
      props: {
        publicKey: params.publicKey
      },
      revalidate: 60
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

export default function NFTProfilePage({ publicKey }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!publicKey) {
    return <ErrorComponent message="Invalid wallet address" />;
  }

  return (
    <AppLayout>
      <div className="p-6">
        <NFTGallery publicKey={publicKey} />
      </div>
    </AppLayout>
  );
}