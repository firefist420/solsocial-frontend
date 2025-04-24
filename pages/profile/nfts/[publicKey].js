import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import AppLayout from '../../../components/UI/AppLayout';
import ErrorComponent from '../../../components/UI/ErrorComponent';
import SkeletonLoader from '../../../components/UI/SkeletonLoader';

const NFTGallery = dynamic(() => import('../../../components/Profile/NFTGallery'), {
  ssr: false,
  loading: () => <SkeletonLoader count={1} />
});

export default function NFTProfilePage() {
  const router = useRouter();
  
  // Handle case where router isn't ready yet
  if (!router.isReady) {
    return <SkeletonLoader count={3} />;
  }

  const { publicKey } = router.query;

  if (!publicKey) {
    return (
      <AppLayout>
        <ErrorComponent message="No wallet address provided" />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6">
        <NFTGallery publicKey={publicKey} />
      </div>
    </AppLayout>
  );
}

// Disable static generation for this page
export async function getServerSideProps() {
  return {
    props: {},
  };
}