export const routePaths = {
  public: {
    landing: '/',
    login: '/login',
    register: '/register',
  },
  resident: {
    home: '/home',
    report: '/report',
    issues: '/issues',
    issueDetail: '/issues/:issueId',
    myReports: '/my-reports',
    myReportDetail: '/my-reports/:reportId',
  },
  signedIn: {
    notifications: '/notifications',
    profile: '/profile',
    help: '/help',
  },
  staff: {
    overview: '/admin',
    issues: '/admin/issues',
    issueDetail: '/admin/issues/:issueId',
    map: '/admin/map',
  },
  admin: {
    staff: '/admin/staff',
    settings: '/admin/settings',
  },
  system: {
    forbidden: '/403',
  },
} as const;

export type RouteAccess =
  'public' | 'signed-in' | 'resident' | 'staff' | 'admin';
export type RouteOwner = 'foundation' | 'citizen' | 'backend';

export interface PlannedRoute {
  path: string;
  access: RouteAccess;
  owner: RouteOwner;
}

export const plannedRoutes: PlannedRoute[] = [
  { path: routePaths.public.landing, access: 'public', owner: 'foundation' },
  { path: routePaths.public.login, access: 'public', owner: 'citizen' },
  { path: routePaths.public.register, access: 'public', owner: 'citizen' },
  { path: routePaths.resident.home, access: 'resident', owner: 'citizen' },
  { path: routePaths.resident.report, access: 'resident', owner: 'citizen' },
  { path: routePaths.resident.issues, access: 'resident', owner: 'citizen' },
  {
    path: routePaths.resident.issueDetail,
    access: 'resident',
    owner: 'citizen',
  },
  {
    path: routePaths.resident.myReports,
    access: 'resident',
    owner: 'citizen',
  },
  {
    path: routePaths.resident.myReportDetail,
    access: 'resident',
    owner: 'citizen',
  },
  {
    path: routePaths.signedIn.notifications,
    access: 'signed-in',
    owner: 'citizen',
  },
  {
    path: routePaths.signedIn.profile,
    access: 'signed-in',
    owner: 'citizen',
  },
  { path: routePaths.signedIn.help, access: 'signed-in', owner: 'citizen' },
  { path: routePaths.staff.overview, access: 'staff', owner: 'backend' },
  { path: routePaths.staff.issues, access: 'staff', owner: 'backend' },
  { path: routePaths.staff.issueDetail, access: 'staff', owner: 'backend' },
  { path: routePaths.staff.map, access: 'staff', owner: 'backend' },
  { path: routePaths.admin.staff, access: 'admin', owner: 'backend' },
  { path: routePaths.admin.settings, access: 'admin', owner: 'backend' },
  { path: routePaths.system.forbidden, access: 'public', owner: 'foundation' },
];
