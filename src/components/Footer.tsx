
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-6 px-6 md:px-8 border-t mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Heart className="h-5 w-5 text-theme-purple mr-2" />
          <span className="text-sm text-gray-600">
            Hug Mind Self © {new Date().getFullYear()}
          </span>
        </div>
        
        <div className="flex space-x-6">
          <a href="#" className="text-sm text-gray-600 hover:text-theme-purple transition-colors">
            เกี่ยวกับเรา
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-theme-purple transition-colors">
            ความเป็นส่วนตัว
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-theme-purple transition-colors">
            เงื่อนไขการใช้งาน
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-theme-purple transition-colors">
            ติดต่อเรา
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
