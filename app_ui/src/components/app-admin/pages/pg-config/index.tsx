import RestartAlert from './RestartAlert';
import ProfilesManager from './profiles-manager';
import PgConfigHeader from './header';
import ConfigManager from './config-manager';

export default function PostgresConfig() {

  return (
    <div className="space-y-6">
      <PgConfigHeader />
      <RestartAlert />
      <ConfigManager />
      <ProfilesManager />
    </div>
  );
}