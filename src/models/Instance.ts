import { DetailedInstanceMetadata } from 'misskey-js/built/entities';

export type Instance = DetailedInstanceMetadata & {
    disableCatTimeline?: boolean;
    disableFeatured?: boolean;
    driveCapacityPerPremiumUserMb?: number;
    disableInvitation?: boolean;
    disableInvitationReason?: string;
    logoImageUrl?: string;
    iconUrl?: string;
    backgroundImageUrl?: string;
} 