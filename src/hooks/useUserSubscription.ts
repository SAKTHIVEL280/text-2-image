import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useUserSubscription() {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Here you would typically check the user's subscription status from your database
        // For now, we'll assume all users are on the free plan
        setIsPremium(false);
      }
    };

    checkSubscription();
  }, []);

  return { isPremium };
}