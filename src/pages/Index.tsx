
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Globe, Sun, Star, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-gradient-to-br from-background to-theme-purple-light/40 dark:to-theme-purple-dark/20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold gradient-text">
                สร้างชีวิตที่สมดุล<br />ด้วยพลังแห่งการเยียวยา
              </h1>
              <p className="text-base md:text-xl text-foreground/80">
                Hug Mind Self ช่วยให้คุณดูแลตัวเอง จิตใจ และพัฒนานิสัยที่ดีอย่างต่อเนื่อง ด้วยระบบติดตามที่ใช้งานง่าย
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button 
                  className="bg-theme-purple hover:bg-theme-purple-dark text-white text-base md:text-lg px-6 py-5 button-hover"
                  onClick={() => navigate("/signup")}
                >
                  เริ่มต้นใช้งานฟรี
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-theme-purple text-theme-purple-dark hover:bg-theme-purple/10 text-base md:text-lg px-6 py-5 button-hover"
                  onClick={() => navigate("/about")}
                >
                  เรียนรู้เพิ่มเติม
                </Button>
              </div>
            </div>
            <div className="relative mt-6 md:mt-0">
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
        <section className="py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 gradient-text">
                เครื่องมือที่ช่วยให้คุณมีชีวิตที่ดีขึ้น
              </h2>
              <p className="text-base md:text-xl text-foreground/80">
                ค้นพบวิธีที่ Hug Mind Self ช่วยให้คุณสร้างนิสัยที่ดี ติดตามความก้าวหน้า และดูแลสุขภาพจิตใจ
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Feature 1 */}
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-lg border border-border card-hover">
                <Heart className="h-10 w-10 md:h-12 md:w-12 text-theme-purple mb-4 md:mb-6" />
                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">ระบบติดตามนิสัย</h3>
                <p className="text-sm md:text-base text-foreground/80">
                  สร้างและติดตามนิสัยที่ดีอย่างต่อเนื่อง ด้วยระบบที่เข้าใจง่ายและใช้งานได้ทันที
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-lg border border-border card-hover">
                <Sun className="h-10 w-10 md:h-12 md:w-12 text-theme-purple mb-4 md:mb-6" />
                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">แรงบันดาลใจประจำวัน</h3>
                <p className="text-sm md:text-base text-foreground/80">
                  รับข้อความให้กำลังใจและแรงบันดาลใจประจำวัน เพื่อช่วยให้คุณเริ่มต้นวันใหม่อย่างมีพลัง
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-lg border border-border card-hover">
                <Globe className="h-10 w-10 md:h-12 md:w-12 text-theme-purple mb-4 md:mb-6" />
                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">ชุมชนที่เข้าใจ</h3>
                <p className="text-sm md:text-base text-foreground/80">
                  เชื่อมต่อกับผู้คนที่มีเป้าหมายเดียวกัน แบ่งปันประสบการณ์ และเรียนรู้ร่วมกัน
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-theme-purple-light/30 dark:bg-theme-purple-dark/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 gradient-text">
                เสียงจากผู้ใช้งานของเรา
              </h2>
              <p className="text-base md:text-xl text-foreground/80">
                ผู้คนทั่วประเทศไทยกำลังปรับปรุงชีวิตของพวกเขาด้วย Hug Mind Self
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* For brevity, showing only one testimonial - the layout will be the same for all */}
              {[
                {
                  text: "Hug Mind Self เปลี่ยนชีวิตฉันไปอย่างสิ้นเชิง ฉันสามารถติดตามนิสัยการฝึกสมาธิได้ต่อเนื่องเป็นเวลา 30 วัน และรู้สึกสงบและมีสมาธิมากขึ้น",
                  name: "นภัส ก.",
                  location: "กรุงเทพฯ",
                  initial: "นก"
                },
                {
                  text: "ระบบติดตามนิสัยของ Hug Mind Self ง่ายต่อการใช้งานมาก และแรงบันดาลใจประจำวันช่วยให้ฉันมีแรงจูงใจในการทำตามเป้าหมาย",
                  name: "ปรีชา ว.",
                  location: "เชียงใหม่",
                  initial: "ปอ"
                },
                {
                  text: "ฉันชอบที่ Hug Mind Self มีทั้งระบบติดตามนิสัยและการจัดการงาน ทำให้ฉันสามารถจัดการชีวิตได้อย่างมีประสิทธิภาพมากขึ้น",
                  name: "อัมพร ส.",
                  location: "ขอนแก่น",
                  initial: "เอม"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-card rounded-xl p-6 md:p-8 shadow-lg border border-border card-hover">
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-foreground/80 mb-4 md:mb-6">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-theme-purple flex items-center justify-center text-white font-bold mr-3 md:mr-4 text-sm md:text-base">
                      {testimonial.initial}
                    </div>
                    <div>
                      <p className="font-semibold text-sm md:text-base">{testimonial.name}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-gradient-to-br from-theme-purple to-theme-purple-dark text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
              พร้อมที่จะเริ่มต้นการเดินทางของคุณแล้วหรือยัง?
            </h2>
            <p className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
              เริ่มต้นใช้งาน Hug Mind Self วันนี้ และค้นพบวิธีที่ดีที่สุดในการดูแลตัวเอง สร้างนิสัยที่ดี และมีชีวิตที่สมดุล
            </p>
            <Button 
              className="bg-white text-theme-purple hover:bg-gray-100 text-base md:text-lg px-6 py-5 button-hover"
              onClick={() => navigate("/signup")}
            >
              สมัครสมาชิกฟรี
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
