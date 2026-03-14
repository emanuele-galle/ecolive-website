import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Ecolive - Case Prefabbricate in Legno'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1D1D1F',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative top line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, transparent 0%, #A0845C 20%, #A0845C 80%, transparent 100%)',
          }}
        />

        {/* Decorative corner elements */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 60,
            width: 60,
            height: 60,
            borderTop: '2px solid #A0845C',
            borderLeft: '2px solid #A0845C',
            opacity: 0.4,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 60,
            width: 60,
            height: 60,
            borderBottom: '2px solid #A0845C',
            borderRight: '2px solid #A0845C',
            opacity: 0.4,
          }}
        />

        {/* Small accent dots */}
        <div
          style={{
            position: 'absolute',
            top: 80,
            right: 120,
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#A0845C',
            opacity: 0.3,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            left: 140,
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#A0845C',
            opacity: 0.2,
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
          }}
        >
          {/* ECOLIVE text */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: 'white',
              letterSpacing: '0.12em',
              lineHeight: 1,
            }}
          >
            ECOLIVE
          </div>

          {/* Decorative separator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginTop: 28,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                width: 60,
                height: 2,
                backgroundColor: '#A0845C',
                opacity: 0.6,
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#A0845C',
              }}
            />
            <div
              style={{
                width: 60,
                height: 2,
                backgroundColor: '#A0845C',
                opacity: 0.6,
              }}
            />
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255, 255, 255, 0.7)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 400,
            }}
          >
            Case Prefabbricate in Legno
          </div>
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            www.ecolive.srl
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
