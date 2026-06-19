'use client';

import { motion } from 'framer-motion';

import { Lock, MapPin } from 'lucide-react';
import PageHeader from '../../layout/PageHeader';
import SettingsButton from '../../ui/SettingsButton';
import { TargetPage } from '../../screens/ProfileScreen';
import WhiteButton from '../../ui/WhiteButton';
import SettingsInput from '../../ui/SettingsInput';
import { useEffect } from 'react';

interface Props {
  page: TargetPage;
  setPage: (page: TargetPage) => void;
}

export default function SettingsContent({ page, setPage }: Props) {
  useEffect(() => {
    console.log("settings",page);
  }, [page]);

  const settings: { icon: typeof Lock; title: string; page: TargetPage }[] = [
    {
      icon: Lock,
      title: 'Change Password',
      page: 'changePassword'
    },
    {
      icon: MapPin,
      title: 'Update Location',
      page: 'changeLocation'
    }
  ];

  return (
    <div className="w-full">
      {page == 'changeLocation' && (
        <>
          <PageHeader title="Change Location" setPage={setPage} page={page} />
          <div className="min-h-screen pb-24 flex items-center justify-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-3 w-full p-5"
            >
              <SettingsInput placeholder="Paris, France" />
              <WhiteButton />
            </motion.div>
          </div>
        </>
      )}
      {page == 'changePassword' && (
        <>
          <PageHeader title="Change Password" setPage={setPage} page={page} />
          <div className="min-h-screen pb-24 flex items-center justify-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-3 w-full p-5"
            >
              <SettingsInput placeholder="New password" />
              <SettingsInput placeholder="Enter your new password again" />
              <WhiteButton />
            </motion.div>
          </div>
        </>
      )}
      {page == 'settings' && (
        <>
          <PageHeader title="Settings" setPage={setPage} page={page} />
          <div className="min-h-screen pb-24 flex items-center justify-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-3 w-full p-5"
            >
              {settings.map((item) => (
                <SettingsButton key={item.title} {...item} setPage={setPage} targetPage={item.page} />
              ))}
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
