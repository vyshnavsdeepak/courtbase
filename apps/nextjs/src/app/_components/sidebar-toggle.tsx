"use client";
import React from 'react';
import { useSidebar } from '../_contexts/sidebar-context';
import type { ButtonProps } from '@court-base/ui/button';
import { Button } from '@court-base/ui/button';
import { Icons } from '@court-base/ui/icons';

const SidebarToggle: React.FC<ButtonProps> = (props) => {
  const { toggleSidebar } = useSidebar();

  const handleToggle = () => {
    toggleSidebar();
  };

  return (
    <Button variant="ghost" onClick={handleToggle} {...props}>
      <Icons.sidebar size={16} />
    </Button>
  );
};

export default SidebarToggle;