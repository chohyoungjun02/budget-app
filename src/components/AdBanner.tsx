import { useEffect, useRef, useState } from 'react';
import { TossAds } from '@apps-in-toss/web-framework';

// 앱인토스 콘솔 > 광고에서 만든 배너용 광고 그룹 ID (.env의 VITE_AD_GROUP_ID)
const AD_GROUP_ID = import.meta.env.VITE_AD_GROUP_ID as string | undefined;

// SDK 초기화는 앱 전체에서 한 번만
let ready: Promise<void> | null = null;
function initAds() {
  ready ??= new Promise((resolve, reject) =>
    TossAds.initialize({ callbacks: { onInitialized: resolve, onInitializationFailed: reject } }),
  );
  return ready;
}

// 화면 맨 아래 배너 광고. 토스 앱 밖(PC 브라우저)이나 ID가 없으면 아무것도 그리지 않아요.
export default function AdBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const supported = !!AD_GROUP_ID && TossAds.attachBanner.isSupported();

  useEffect(() => {
    if (!supported || !ref.current) return;
    const el = ref.current;
    let banner: { destroy: () => void } | undefined;
    let cancelled = false;

    initAds()
      .then(() => {
        if (cancelled) return;
        banner = TossAds.attachBanner(AD_GROUP_ID!, el, {
          callbacks: {
            onNoFill: () => setHidden(true),
            onAdFailedToRender: () => setHidden(true),
          },
        });
      })
      .catch(() => setHidden(true));

    return () => {
      cancelled = true;
      banner?.destroy();
    };
  }, [supported]);

  if (!supported || hidden) return null;
  return <div ref={ref} style={{ marginTop: 12 }} aria-label="광고" />;
}
