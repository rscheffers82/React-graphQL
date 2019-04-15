import Link from 'next/link';

import CreateItem from '../components/CreateItem';

const Sell = () => (
  <div>
    <CreateItem />
    <Link href="/">
      <a>Home</a>
    </Link>
  </div>
);

export default Sell;