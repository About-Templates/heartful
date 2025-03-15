
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Globe, Sun, Star, ArrowRight } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6 md:px-8 bg-gradient-to-br from-white to-theme-purple-light">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
                สร้างชีวิตที่สมดุล<br />ด้วยพลังแห่งการเยียวยา
              </h1>
              <p className="text-xl text-gray-700">
                Hug Mind Self ช่วยให้คุณดูแลตัวเอง จิตใจ และพัฒนานิสัยที่ดีอย่างต่อเนื่อง ด้วยระบบติดตามที่ใช้งานง่าย
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button 
                  className="bg-theme-purple hover:bg-theme-purple-dark text-white text-lg px-8 py-6 button-hover"
                  onClick={() => navigate("/signup")}
                >
                  เริ่มต้นใช้งานฟรี
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-theme-purple text-theme-purple-dark hover:bg-theme-purple/10 text-lg px-8 py-6 button-hover"
                  onClick={() => navigate("/about")}
                >
                  เรียนรู้เพิ่มเติม
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-theme-purple/20 to-theme-purple-light/30 rounded-full blur-3xl"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/30 backdrop-blur">
                <img 
                  src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Peaceful meditation" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                เครื่องมือที่ช่วยให้คุณมีชีวิตที่ดีขึ้น
              </h2>
              <p className="text-xl text-gray-700">
                ค้นพบวิธีที่ Hug Mind Self ช่วยให้คุณสร้างนิสัยที่ดี ติดตามความก้าวหน้า และดูแลสุขภาพจิตใจ
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 card-hover">
                <Heart className="h-12 w-12 text-theme-purple mb-6" />
                <h3 className="text-2xl font-semibold mb-4">ระบบติดตามนิสัย</h3>
                <p className="text-gray-700">
                  สร้างและติดตามนิสัยที่ดีอย่างต่อเนื่อง ด้วยระบบที่เข้าใจง่ายและใช้งานได้ทันที
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 card-hover">
                <Sun className="h-12 w-12 text-theme-purple mb-6" />
                <h3 className="text-2xl font-semibold mb-4">แรงบันดาลใจประจำวัน</h3>
                <p className="text-gray-700">
                  รับข้อความให้กำลังใจและแรงบันดาลใจประจำวัน เพื่อช่วยให้คุณเริ่มต้นวันใหม่อย่างมีพลัง
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 card-hover">
                <Globe className="h-12 w-12 text-theme-purple mb-6" />
                <h3 className="text-2xl font-semibold mb-4">ชุมชนที่เข้าใจ</h3>
                <p className="text-gray-700">
                  เชื่อมต่อกับผู้คนที่มีเป้าหมายเดียวกัน แบ่งปันประสบการณ์ และเรียนรู้ร่วมกัน
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 px-6 md:px-8 bg-theme-purple-light/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                เสียงจากผู้ใช้งานของเรา
              </h2>
              <p className="text-xl text-gray-700">
                ผู้คนทั่วประเทศไทยกำลังปรับปรุงชีวิตของพวกเขาด้วย Hug Mind Self
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 card-hover">
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  "Hug Mind Self เปลี่ยนชีวิตฉันไปอย่างสิ้นเชิง ฉันสามารถติดตามนิสัยการฝึกสมาธิได้ต่อเนื่องเป็นเวลา 30 วัน และรู้สึกสงบและมีสมาธิมากขึ้น"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-theme-purple flex items-center justify-center text-white font-bold mr-4">
                    นก
                  </div>
                  <div>
                    <p className="font-semibold">นภัส ก.</p>
                    <p className="text-sm text-gray-500">กรุงเทพฯ</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 card-hover">
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  "ระบบติดตามนิสัยของ Hug Mind Self ง่ายต่อการใช้งานมาก และแรงบันดาลใจประจำวันช่วยให้ฉันมีแรงจูงใจในการทำตามเป้าหมาย"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-theme-purple flex items-center justify-center text-white font-bold mr-4">
                    ปอ
                  </div>
                  <div>
                    <p className="font-semibold">ปรีชา ว.</p>
                    <p className="text-sm text-gray-500">เชียงใหม่</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 card-hover">
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  "ฉันชอบที่ Hug Mind Self มีทั้งระบบติดตามนิสัยและการจัดการงาน ทำให้ฉันสามารถจัดการชีวิตได้อย่างมีประสิทธิภาพมากขึ้น"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-theme-purple flex items-center justify-center text-white font-bold mr-4">
                    เอม
                  </div>
                  <div>
                    <p className="font-semibold">อัมพร ส.</p>
                    <p className="text-sm text-gray-500">ขอนแก่น</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 md:px-8 bg-gradient-to-br from-theme-purple to-theme-purple-dark text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              พร้อมที่จะเริ่มต้นการเดินทางของคุณแล้วหรือยัง?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              เริ่มต้นใช้งาน Hug Mind Self วันนี้ และค้นพบวิธีที่ดีที่สุดในการดูแลตัวเอง สร้างนิสัยที่ดี และมีชีวิตที่สมดุล
            </p>
            <Button 
              className="bg-white text-theme-purple hover:bg-gray-100 text-lg px-8 py-6 button-hover"
              onClick={() => navigate("/signup")}
            >
              สมัครสมาชิกฟรี
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
