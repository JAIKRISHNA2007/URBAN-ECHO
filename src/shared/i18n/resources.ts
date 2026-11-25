export const resources = {
  en: {
    translation: {
      common: {
        language: 'Language',
        english: 'English',
        tamil: 'Tamil',
        demoBanner:
          'DEMO mode — data is synthetic and no live service is connected.',
        returnToShell: 'Return to the application shell',
      },
      foundation: {
        eyebrow: 'Shared project foundation',
        title: 'The common application shell is ready.',
        description:
          'Routing, contracts, design tokens, localization, API boundaries, testing, PWA setup and local backend tooling are prepared for the three owned work packages.',
        architectureTitle: 'One application, one backend',
        architectureBody:
          'Resident and staff experiences share one React application, one design system and one Supabase contract.',
        contractsTitle: 'Canonical contracts',
        contractsBody:
          'Wire values, action schemas, deterministic fixtures and client interfaces live in the shared contract module.',
        boundariesTitle: 'Protected module boundaries',
        boundariesBody:
          'Citizen, administration and AI packages can now develop independently against reviewed shared interfaces.',
        statusLabel: 'Foundation status',
        statusValue:
          'Configuration complete; feature packages are intentionally not implemented.',
      },
      errors: {
        forbiddenTitle: 'Access denied',
        forbiddenBody:
          'This route requires a role that has not been authorized.',
        notFoundTitle: 'Page not found',
        notFoundBody:
          'The requested route is not part of the current application shell.',
      },
    },
  },
  ta: {
    translation: {
      common: {
        language: 'மொழி',
        english: 'ஆங்கிலம்',
        tamil: 'தமிழ்',
        demoBanner: 'மாதிரி நிலை — தரவு செயற்கையானது; நேரடி சேவை இணைக்கப்படவில்லை.',
        returnToShell: 'செயலி அமைப்பிற்குத் திரும்புக',
      },
      foundation: {
        eyebrow: 'பகிரப்பட்ட திட்ட அடித்தளம்',
        title: 'பொதுவான செயலி அமைப்பு தயாராக உள்ளது.',
        description:
          'வழிசெலுத்தல், ஒப்பந்தங்கள், வடிவமைப்பு மாறிகள், மொழியாக்கம், API எல்லைகள், சோதனை, PWA மற்றும் உள்ளூர் பின்தள கருவிகள் மூன்று பணித் தொகுப்புகளுக்காக தயாராக உள்ளன.',
        architectureTitle: 'ஒரே செயலி, ஒரே பின்தளம்',
        architectureBody:
          'குடியிருப்பாளர் மற்றும் பணியாளர் அனுபவங்கள் ஒரே React செயலி, வடிவமைப்பு அமைப்பு மற்றும் Supabase ஒப்பந்தத்தைப் பகிர்கின்றன.',
        contractsTitle: 'நிலையான ஒப்பந்தங்கள்',
        contractsBody:
          'தரவு மதிப்புகள், செயல் வடிவங்கள், மாதிரி தரவு மற்றும் கிளையண்ட் இடைமுகங்கள் பகிரப்பட்ட ஒப்பந்தப் பகுதியில் உள்ளன.',
        boundariesTitle: 'பாதுகாக்கப்பட்ட தொகுதி எல்லைகள்',
        boundariesBody:
          'குடிமக்கள், நிர்வாகம் மற்றும் AI பணித் தொகுப்புகள் ஆய்வு செய்யப்பட்ட பகிரப்பட்ட இடைமுகங்களுக்கு எதிராக தனித்தனியாக உருவாக்கப்படலாம்.',
        statusLabel: 'அடித்தள நிலை',
        statusValue:
          'அமைப்பு முடிந்தது; அம்சத் தொகுப்புகள் நோக்கத்துடன் இன்னும் செயல்படுத்தப்படவில்லை.',
      },
      errors: {
        forbiddenTitle: 'அணுகல் மறுக்கப்பட்டது',
        forbiddenBody: 'இந்தப் பாதைக்கு அங்கீகரிக்கப்பட்ட பயனர் பங்கு தேவை.',
        notFoundTitle: 'பக்கம் கிடைக்கவில்லை',
        notFoundBody: 'கோரப்பட்ட பாதை தற்போதைய செயலி அமைப்பில் இல்லை.',
      },
    },
  },
} as const;
