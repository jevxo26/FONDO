import { mockFAQs } from "@/data/faq";
import { FAQ } from "@/types/faq";
import { CornerDownRight, MessageSquare, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const QaTab = () => {
  return (
    <div className="flex flex-col gap-8">
    
      {/* Question Input */}
      <div className="rounded-2xl border border-border/60 bg-muted/20 p-5 dark:bg-muted/5">
        <h4 className="font-sans text-sm font-semibold text-secondary-foreground mb-3 flex items-center gap-2">
          <MessageSquare className="size-4 text-primary" /> 
          Have a question about this dish?
        </h4>

        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Ask about ingredients, portion size, catering..."
            className="pr-14 bg-white dark:bg-card"
          />

          <Button
            variant="default"
            size="icon"
            className="absolute right-1.5 top-1.5 size-9 rounded-lg active:scale-95"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>


      {/* QA List */}
      <div className="flex flex-col gap-6">
        {mockFAQs.map((item:FAQ) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 border-b border-border/40 pb-6 last:border-0 last:pb-0"
          >
            
            {/* Customer Question */}
            <div className="flex flex-col gap-1.5">
              <p className="font-sans text-sm text-foreground bg-muted/10 p-3 rounded-xl border border-border/30">
                <span className="font-bold text-primary mr-1">Q:</span>
                {item.question}
              </p>
            </div>


            {/* Kitchen Answer */}
            {item.answer && (
              <div className="flex gap-2 pl-4 md:pl-6">
                <CornerDownRight className="size-4 text-muted-foreground shrink-0 mt-1" />

                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-sm font-semibold text-secondary-foreground">
                        Food Flow Kitchen
                      </span>

                      <span className="rounded bg-primary/20 px-2 py-0.5 font-sans text-[10px] font-medium text-primary-foreground dark:text-white border border-primary/30">
                        Chef
                      </span>
                    </div>

                    <span className="font-sans text-xs text-muted-foreground">
                     1/2/44
                    </span>
                  </div>

                  <p className="font-sans text-sm text-muted-foreground bg-foreground/5 dark:bg-white/5 p-3 rounded-xl border border-border/30 leading-relaxed">
                    <span className="font-bold text-primary mr-1">A:</span>
                    {item.answer}
                  </p>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};

export default QaTab;