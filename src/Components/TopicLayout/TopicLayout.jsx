import { Outlet } from 'react-router-dom';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';

const TopicLayout = () => {
  return (
    <div className="topic-layout">
      <Navbar />
      <main className="topic-page">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default TopicLayout;