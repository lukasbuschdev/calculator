import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

export const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', component: MainComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'legal-notice', component: LegalNoticeComponent },
];
