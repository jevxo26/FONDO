"use client";

import FeaturedStories from "@/components/reviews/featured-stories";
import FilteredFeed from "@/components/reviews/filtered-feed";
import ReviewsDashboard from "@/components/reviews/review-dashboard";
import EngagementBanner from "@/components/reviews/review-engagement";
import ReviewFaq from "@/components/reviews/review-faq";
import ReviewsHero from "@/components/reviews/review-showcase";
import SocialGrid from "@/components/reviews/social-grid";
import SubscriberJourney from "@/components/reviews/subscribe-journey";
import ValuePropsGrid from "@/components/reviews/value-props";

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* 1. Hero Review Showcase */}
      <ReviewsHero />

      {/* 2. Rating Breakdown & Analytics Dashboard */}
      <ReviewsDashboard />

      {/* 3. Featured Stories (Multimedia Testimonials) */}
      <FeaturedStories />

      {/* 4. Social Grid ("Food Flow in the Wild") */}
      <SocialGrid />

      {/* 5. Tag-Filtered Review Feed & Search */}
      <FilteredFeed />

      {/* 6. The Typical Subscriber Journey */}
      <SubscriberJourney />

      {/* 7. Core Value Proposition Grid ("Why We're Rated 4.9/5") */}
      <ValuePropsGrid />

      {/* 8. Interactive CTA Banner */}
      <EngagementBanner />

      {/* 9. Review Validation FAQ Section */}
      <ReviewFaq />
    </main>
  );
}