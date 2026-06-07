import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ─── Brand Tokens ────────────────────────────────────────────────────────────
const COLORS = {
  bg: "#0D0D0D",
  surface: "#161616",
  card: "#1E1E1E",
  accent: "#FF6B35",       // warm orange — ecommerce energy
  accentSoft: "#FF8C5A",
  gold: "#F5C842",
  white: "#FFFFFF",
  muted: "#6B7280",
  border: "#2A2A2A",
};

// ─── Scene 1: Brand Logo Reveal (frames 0–90) ─────────────────────────────
const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Iris background expand
  const irisRadius = interpolate(frame, [0, 45], [0, 160], {
    extrapolateRight: "clamp",
  });

  // Cart icon pops in
  const cartSpring = spring({
    fps,
    frame: frame - 10,
    config: { damping: 7, stiffness: 120, mass: 0.7 },
  });
  const cartScale = interpolate(cartSpring, [0, 1], [0, 1]);
  const cartOpacity = interpolate(cartSpring, [0, 0.2], [0, 1], {
    extrapolateRight: "clamp",
  });

  // "PARIKART" — char-by-char stagger
  const brand = "PARIKART".split("");
  const tagSpring = spring({
    fps,
    frame: frame - 40,
    config: { damping: 14, stiffness: 100 },
  });
  const taglineOpacity = interpolate(tagSpring, [0, 1], [0, 1]);
  const taglineY = interpolate(tagSpring, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
      }}
    >
      {/* Glowing iris background circle */}
      <div
        style={{
          position: "absolute",
          width: irisRadius * 2,
          height: irisRadius * 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}22 0%, ${COLORS.accent}08 60%, transparent 100%)`,
          border: `1px solid ${COLORS.accent}33`,
        }}
      />

      {/* Cart icon SVG */}
      <div
        style={{
          transform: `scale(${cartScale})`,
          opacity: cartOpacity,
          width: 120,
          height: 120,
          backgroundColor: COLORS.accent,
          borderRadius: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 60px ${COLORS.accent}55`,
        }}
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2" />
          <path
            d="M16 10a4 4 0 01-8 0"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* PARIKART — char stagger */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {brand.map((char, i) => {
          const charSpring = spring({
            fps,
            frame: frame - (20 + i * 3),
            config: { damping: 10, stiffness: 130, mass: 0.6 },
          });
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontSize: 88,
                fontWeight: 900,
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: -1,
                color: COLORS.white,
                opacity: charSpring,
                transform: `translateY(${interpolate(charSpring, [0, 1], [40, 0])}px)`,
                lineHeight: 1,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontSize: 26,
          fontWeight: 500,
          fontFamily: "system-ui, sans-serif",
          color: COLORS.muted,
          letterSpacing: 5,
          textTransform: "uppercase",
        }}
      >
        Shop Everything. Anywhere.
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2: Product Cards Fly In (frames 90–180) ───────────────────────
const ProductCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const products = useMemo(
    () => [
      { emoji: "👟", name: "Sneakers", price: "₹2,499", color: "#3B82F6" },
      { emoji: "📱", name: "Mobiles", price: "₹12,999", color: "#8B5CF6" },
      { emoji: "👗", name: "Fashion", price: "₹899", color: "#EC4899" },
      { emoji: "🎧", name: "Audio", price: "₹3,299", color: COLORS.accent },
    ],
    []
  );

  // Section header
  const headerSpring = spring({
    fps,
    frame,
    config: { damping: 14, stiffness: 100 },
  });
  const headerOpacity = interpolate(headerSpring, [0, 1], [0, 1]);
  const headerY = interpolate(headerSpring, [0, 1], [-30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        padding: "0 60px",
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: 6,
            color: COLORS.accent,
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Explore Categories
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: COLORS.white,
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1.1,
          }}
        >
          Millions of products.{"\n"}One cart.
        </div>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          width: "100%",
        }}
      >
        {products.map((product, i) => {
          const delay = i * 6;
          const cardSpring = spring({
            fps,
            frame: frame - delay - 10,
            config: { damping: 12, stiffness: 120, mass: 0.8 },
          });
          const cardY = interpolate(cardSpring, [0, 1], [80, 0]);
          const cardOpacity = interpolate(cardSpring, [0, 0.3], [0, 1], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
                backgroundColor: COLORS.card,
                borderRadius: 28,
                padding: "36px 28px",
                border: `1px solid ${COLORS.border}`,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor: `${product.color}22`,
                  borderRadius: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                }}
              >
                {product.emoji}
              </div>
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: COLORS.white,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {product.name}
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: product.color,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                From {product.price}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3: Offer Banner + CTA (frames 180–270) ────────────────────────
const OfferCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient pulse
  const pulse = Math.sin(frame / 12) * 0.04 + 1;

  // "SALE" badge pop
  const badgeSpring = spring({
    fps,
    frame: frame - 5,
    config: { damping: 6, stiffness: 180, mass: 0.5 },
  });

  // Offer text wipe
  const wipe = interpolate(frame, [15, 50], [0, 100], {
    extrapolateRight: "clamp",
  });

  // CTA button
  const ctaSpring = spring({
    fps,
    frame: frame - 45,
    config: { damping: 14, stiffness: 100 },
  });
  const ctaOpacity = interpolate(ctaSpring, [0, 1], [0, 1]);
  const ctaY = interpolate(ctaSpring, [0, 1], [40, 0]);

  // Stars stagger
  const stars = ["⭐", "⭐", "⭐", "⭐", "⭐"];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        padding: "0 60px",
      }}
    >
      {/* Glow blob */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}18 0%, transparent 70%)`,
          transform: `scale(${pulse})`,
        }}
      />

      {/* SALE badge */}
      <div
        style={{
          transform: `scale(${badgeSpring})`,
          backgroundColor: COLORS.gold,
          color: "#0D0D0D",
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: 4,
          padding: "10px 32px",
          borderRadius: 100,
          fontFamily: "system-ui, sans-serif",
          textTransform: "uppercase",
        }}
      >
        🔥 Grand Sale — Up to 70% Off
      </div>

      {/* Offer headline with wipe */}
      <div
        style={{
          textAlign: "center",
          clipPath: `inset(0 ${100 - wipe}% 0 0)`,
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: COLORS.white,
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1,
            letterSpacing: -3,
          }}
        >
          70%
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.accent,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: -1,
          }}
        >
          OFF TODAY ONLY
        </div>
      </div>

      {/* Stars */}
      <div style={{ display: "flex", gap: 8 }}>
        {stars.map((s, i) => {
          const starSpring = spring({
            fps,
            frame: frame - (35 + i * 4),
            config: { damping: 8, stiffness: 160 },
          });
          return (
            <span
              key={i}
              style={{
                fontSize: 32,
                transform: `scale(${starSpring})`,
                display: "inline-block",
              }}
            >
              {s}
            </span>
          );
        })}
      </div>

      {/* CTA Button */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          backgroundColor: COLORS.accent,
          color: COLORS.white,
          fontSize: 34,
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
          padding: "28px 80px",
          borderRadius: 100,
          letterSpacing: 1,
          boxShadow: `0 20px 60px ${COLORS.accent}55`,
        }}
      >
        Shop Now on PARIKART
      </div>

      {/* Sub text */}
      <div
        style={{
          opacity: ctaOpacity,
          fontSize: 22,
          color: COLORS.muted,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: 1,
        }}
      >
        Free delivery · Easy returns · Secure payments
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4: Final Logo Lock-up (frames 270–300) ─────────────────────────
const FinalLockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lockSpring = spring({
    fps,
    frame,
    config: { damping: 18, stiffness: 120 },
  });
  const logoOpacity = interpolate(lockSpring, [0, 1], [0, 1]);
  const logoScale = interpolate(lockSpring, [0, 1], [0.85, 1]);

  // Exit fade at the very end
  const exitOpacity = interpolate(frame, [20, 30], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        opacity: exitOpacity,
      }}
    >
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            backgroundColor: COLORS.accent,
            borderRadius: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 40px ${COLORS.accent}66`,
          }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2" />
            <path
              d="M16 10a4 4 0 01-8 0"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: COLORS.white,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: -2,
          }}
        >
          PARIKART
        </div>

        <div
          style={{
            fontSize: 22,
            color: COLORS.accent,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: 4,
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          Your Shopping Universe
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Root Composition ─────────────────────────────────────────────────────
export const ParikcartSplash: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Scene 1: Logo Reveal — 0 to 90 */}
      <Sequence  durationInFrames={90}>
        <LogoReveal />
      </Sequence>

      {/* Scene 2: Product Cards — 90 to 180 */}
      <Sequence from={90} durationInFrames={90}>
        <ProductCards />
      </Sequence>

      {/* Scene 3: Offer / CTA — 180 to 270 */}
      <Sequence from={180} durationInFrames={90}>
        <OfferCTA />
      </Sequence>

      {/* Scene 4: Final Lockup — 270 to 300 */}
      <Sequence from={270} durationInFrames={30}>
        <FinalLockup />
      </Sequence>
    </AbsoluteFill>
  );
};
