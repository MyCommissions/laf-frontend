import { Search, Eye } from "lucide-react";
import Card from "../components/ui/Card";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "Lost",
    description: "I lost something",
    icon: <Search className="w-8 h-8" />,
    path: "/lost",
  },
  {
    title: "Found",
    description: "I found something",
    icon: <Eye className="w-8 h-8" />,
    path: "/found",
  },
];

export default function HomeLayout() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#D6D3D1] p-8 gap-8 lg:gap-32">
      {cards.map(({ title, description, icon, path }) => (
        <Link
          key={title}
          to={path}
          className="transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
        >
          <Card title={title} description={description} icon={icon} />
        </Link>
      ))}
    </div>
  );
}
