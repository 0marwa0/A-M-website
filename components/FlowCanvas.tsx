import React from "react";

interface FlowCanvasProps {
  t: (key: string) => any;
  locale: string;
}

const FlowCanvas: React.FC<FlowCanvasProps> = ({ t, locale }) => {
  const center = { x: 600, y: 300 };

  // Left side - Application icons with scattered, organic positioning (2 columns)
  const leftApps = [
    // First column (closer to edge)
    { x: 50, y: 60, size: 60, label: "Gmail", color: "#EA4335", icon: "gmail" },
    { x: 55, y: 180, size: 60, label: "Calendar", color: "#4285F4", icon: "calendar" },
    { x: 45, y: 280, size: 60, label: "Browser", color: "#4285F4", icon: "chrome" },
    { x: 50, y: 380, size: 60, label: "Moodle", color: "#F98012", icon: "moodle" },
    { x: 40, y: 480, size: 60, label: "Slack", color: "#4A154B", icon: "slack" },

    // Second column (further from edge)
    { x: 140, y: 40, size: 60, label: "Drive", color: "#4285F4", icon: "drive" },
    { x: 150, y: 130, size: 60, label: "Outlook", color: "#0078D4", icon: "outlook" },
    { x: 135, y: 220, size: 60, label: "Teams", color: "#6264A7", icon: "teams" },
    { x: 145, y: 310, size: 60, label: "Zoom", color: "#2D8CFF", icon: "zoom" },
    { x: 140, y: 400, size: 60, label: "Notion", color: "#000000", icon: "notion" },
    { x: 150, y: 490, size: 60, label: "Trello", color: "#0079BF", icon: "trello" },
    { x: 135, y: 560, size: 60, label: "Asana", color: "#F06A6A", icon: "asana" },
  ];

  // User groups around the center
  const userGroups = [
    { x: center.x, y: center.y - 180, label: "Students", color: "#E44CFF", angle: -90 },
    { x: center.x - 180, y: center.y, label: "Faculty", color: "#5861F2", angle: 180 },
    { x: center.x + 180, y: center.y, label: "Admin", color: "#4EF0FF", angle: 0 },
  ];

  // Right side - Notification boxes
  const notifications = [
    {
      x: 1000,
      y: 150,
      title: t("hero.notifications.first.title"),
      subtitle: t("hero.notifications.first.subtitle"),
      color: "#E44CFF"
    },
    {
      x: 1000,
      y: 300,
      title: t("hero.notifications.second.title"),
      subtitle: t("hero.notifications.second.subtitle"),
      color: "#5861F2"
    },
    {
      x: 1000,
      y: 450,
      title: t("hero.notifications.third.title"),
      subtitle: t("hero.notifications.third.subtitle"),
      color: "#4EF0FF"
    },
  ];

  // Generate connections from apps to center with smooth curves
  const generateAppConnections = (): Array<{ id: string; path: string; color: string }> => {
    const connections: Array<{ id: string; path: string; color: string }> = [];
    leftApps.forEach((app, idx) => {
      const startX = app.x + app.size;
      const startY = app.y + app.size / 2;
      const endX = center.x - 120;
      const endY = center.y;

      // Create smooth curved path with rounded corners
      const horizontalDist = 150; // How far to go straight before curving
      const point1X = startX + horizontalDist;
      const point1Y = startY;

      // Control points for smooth S-curve
      const controlX1 = point1X + 50;
      const controlY1 = startY;
      const controlX2 = endX - 80;
      const controlY2 = endY;

      // Path: straight line, then smooth curve to center
      const path = `M ${startX} ${startY} L ${point1X} ${point1Y} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;

      connections.push({
        id: `app-${idx}`,
        path: path,
        color: app.color,
      });
    });
    return connections;
  };

  // Generate connections from center to user groups
  const generateUserConnections = (): Array<{ id: string; path: string; color: string }> => {
    const connections: Array<{ id: string; path: string; color: string }> = [];
    userGroups.forEach((group, idx) => {
      const rad = (group.angle * Math.PI) / 180;
      const startX = center.x + Math.cos(rad) * 120;
      const startY = center.y + Math.sin(rad) * 120;
      const endX = group.x;
      const endY = group.y;

      connections.push({
        id: `user-${idx}`,
        path: `M ${startX} ${startY} L ${endX} ${endY}`,
        color: group.color,
      });
    });
    return connections;
  };

  // Generate connections from user groups to notifications
  const generateNotificationConnections = (): Array<{ id: string; path: string; color: string }> => {
    const connections: Array<{ id: string; path: string; color: string }> = [];
    notifications.forEach((notif, idx) => {
      const group = userGroups[idx % userGroups.length];
      const startX = group.x;
      const startY = group.y;
      const endX = notif.x - 10;
      const endY = notif.y;

      const midX1 = startX + (endX - startX) * 0.3;
      const midY1 = startY + (endY - startY) * 0.4 + (Math.random() - 0.5) * 50;
      const midX2 = startX + (endX - startX) * 0.7;
      const midY2 = startY + (endY - startY) * 0.6 + (Math.random() - 0.5) * 50;

      connections.push({
        id: `notif-${idx}`,
        path: `M ${startX} ${startY} C ${midX1} ${midY1}, ${midX2} ${midY2}, ${endX} ${endY}`,
        color: notif.color,
      });
    });
    return connections;
  };

  const appConnections = generateAppConnections();
  const userConnections = generateUserConnections();
  const notifConnections = generateNotificationConnections();

  // Render authentic app icons
  const renderAppIcon = (app: any) => {
    switch (app.icon) {
      case "gmail":
        return (
          <g>
            {/* White background envelope */}
            <rect x="2" y="6" width="20" height="14" rx="1" fill="white" />
            {/* Red top flap */}
            <path d="M 2 6 L 12 14 L 22 6 Z" fill="#EA4335" />
            {/* Blue left side */}
            <path d="M 2 6 L 2 20 L 7 15 L 12 14 Z" fill="#4285F4" />
            {/* Green right side */}
            <path d="M 22 6 L 22 20 L 17 15 L 12 14 Z" fill="#34A853" />
            {/* Yellow bottom left */}
            <path d="M 2 20 L 7 15 L 7 20 Z" fill="#FBBC04" />
            {/* Red bottom right */}
            <path d="M 22 20 L 17 15 L 17 20 Z" fill="#EA4335" />
          </g>
        );
      case "drive":
        return (
          <g>
            <path d="M 8 6 L 16 6 L 24 20 L 20 20 Z" fill="#4285F4" />
            <path d="M 0 20 L 12 38 L 16 32 L 4 20 Z" fill="#0F9D58" />
            <path d="M 16 6 L 24 20 L 12 38 L 4 24 Z" fill="#F4B400" />
          </g>
        );
      case "outlook":
        return (
          <g>
            <rect width="24" height="24" fill="#0078D4" rx="2" />
            <text x="12" y="17" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">O</text>
          </g>
        );
      case "calendar":
        return (
          <g>
            <rect x="2" y="4" width="20" height="18" rx="2" fill="white" stroke="#4285F4" strokeWidth="2" />
            <rect x="2" y="4" width="20" height="6" fill="#4285F4" rx="2" />
            <text x="12" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4285F4">31</text>
          </g>
        );
      case "teams":
        return (
          <g>
            <rect width="24" height="24" fill="#6264A7" rx="2" />
            <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">T</text>
          </g>
        );
      case "chrome":
        return (
          <g>
            <circle cx="12" cy="12" r="11" fill="#4285F4" />
            <circle cx="12" cy="12" r="7" fill="white" />
            <path d="M 12 5 A 7 7 0 0 1 19 12 L 12 12 Z" fill="#EA4335" />
            <path d="M 5 12 A 7 7 0 0 1 12 5 L 12 12 Z" fill="#FBBC04" />
            <path d="M 12 19 A 7 7 0 0 1 5 12 L 12 12 Z" fill="#34A853" />
            <circle cx="12" cy="12" r="4" fill="#4285F4" />
          </g>
        );
      case "moodle":
        return (
          <g>
            <circle cx="12" cy="12" r="11" fill="#F98012" />
            <text x="12" y="17" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">M</text>
          </g>
        );
      case "slack":
        return (
          <g>
            <rect width="24" height="24" fill="#4A154B" rx="4" />
            <text x="12" y="17" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">#</text>
          </g>
        );
      case "zoom":
        return (
          <g>
            <circle cx="12" cy="12" r="11" fill="#2D8CFF" />
            <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">Z</text>
          </g>
        );
      case "notion":
        return (
          <g>
            <rect width="24" height="24" fill="white" rx="4" />
            <rect x="2" y="2" width="20" height="20" fill="#000000" rx="3" />
            <text x="12" y="17" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">N</text>
          </g>
        );
      case "trello":
        return (
          <g>
            <rect width="24" height="24" fill="#0079BF" rx="2" />
            <rect x="5" y="6" width="5" height="12" fill="white" rx="1" />
            <rect x="14" y="6" width="5" height="8" fill="white" rx="1" />
          </g>
        );
      case "asana":
        return (
          <g>
            <circle cx="12" cy="12" r="11" fill="#F06A6A" />
            <circle cx="8" cy="10" r="3" fill="white" />
            <circle cx="16" cy="10" r="3" fill="white" />
            <circle cx="12" cy="16" r="3" fill="white" />
          </g>
        );
      default:
        return <circle cx="12" cy="12" r="11" fill={app.color} />;
    }
  };

  return (
    <div className="flow-wrapper">
      <svg
        width="1400"
        height="650"
        viewBox="0 0 1400 650"
        className="flow-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Gradients for center */}
          <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E44CFF" />
            <stop offset="50%" stopColor="#5861F2" />
            <stop offset="100%" stopColor="#4EF0FF" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="1400" height="650" fill="transparent" />

        {/* Connection lines from apps to center */}
        {appConnections.map((conn) => (
          <path
            key={conn.id}
            d={conn.path}
            stroke={conn.color}
            strokeWidth="2"
            strokeOpacity="0.4"
            fill="none"
            filter="url(#glow)"
            className="connection-line"
          />
        ))}

        {/* Connection lines from center to notifications */}
        {notifications.map((notif, idx) => {
          const startX = center.x + 120;
          const startY = center.y;
          const endX = notif.x - 10;
          const endY = notif.y;

          const midX1 = startX + (endX - startX) * 0.3;
          const midY1 = startY + (endY - startY) * 0.4 + (Math.random() - 0.5) * 50;
          const midX2 = startX + (endX - startX) * 0.7;
          const midY2 = startY + (endY - startY) * 0.6 + (Math.random() - 0.5) * 50;

          const path = `M ${startX} ${startY} C ${midX1} ${midY1}, ${midX2} ${midY2}, ${endX} ${endY}`;

          return (
            <path
              key={`center-notif-${idx}`}
              d={path}
              stroke={notif.color}
              strokeWidth="2"
              strokeOpacity="0.4"
              fill="none"
              filter="url(#glow)"
              className="connection-line"
            />
          );
        })}

        {/* LEFT SIDE - Application Icons */}
        {leftApps.map((app, idx) => (
          <g key={`app-${idx}`} transform={`translate(${app.x}, ${app.y})`}>
            {/* Glow background */}
            <circle
              cx={app.size / 2}
              cy={app.size / 2}
              r={app.size / 2 + 4}
              fill={app.color}
              opacity="0.2"
              filter="url(#glow)"
            />

            {/* Icon container */}
            <g transform={`translate(${app.size / 2 - 12}, ${app.size / 2 - 12})`}>
              {renderAppIcon(app)}
            </g>
          </g>
        ))}

        {/* CENTER - AI Hub Circle */}
        <g transform={`translate(${center.x}, ${center.y})`}>
          {/* Outer ring */}
          <circle
            r="130"
            fill="none"
            stroke="url(#centerGradient)"
            strokeWidth="4"
            opacity="0.5"
            filter="url(#glow)"
          />

          {/* Main circle */}
          <circle
            r="110"
            fill="rgba(24, 27, 53, 0.95)"
            stroke="url(#centerGradient)"
            strokeWidth="3"
            filter="url(#glow)"
          />

          {/* AI System Label */}
          <text
            y="8"
            textAnchor="middle"
            fontSize="24"
            fontWeight="600"
            fill="white"
          >
            Trimindes AI
          </text>
        </g>


        {/* RIGHT SIDE - Notification Boxes */}
        {notifications.map((notif, idx) => (
          <g key={`notif-${idx}`}>
            {/* Notification card */}
            <rect
              x={notif.x}
              y={notif.y - 40}
              width="350"
              height="80"
              rx="12"
              fill="rgba(24, 27, 53, 0.95)"
              stroke={notif.color}
              strokeWidth="2"
              filter="url(#glow)"
              className="notification-card"
            />

            {/* Icon */}
            <circle
              cx={notif.x + 35}
              cy={notif.y}
              r="18"
              fill={notif.color}
            />
            <text
              x={notif.x + 35}
              y={notif.y + 6}
              textAnchor="middle"
              fontSize="18"
            >
              🤖
            </text>

            {/* Title and Subtitle using foreignObject for proper RTL */}
            <foreignObject
              x={notif.x + 65}
              y={notif.y - 30}
              width="270"
              height="60"
            >
              <div style={{
                direction: locale === 'ar' ? 'rtl' : 'ltr',
                textAlign: locale === 'ar' ? 'right' : 'left'
              }}>
                <div style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '4px'
                }}>
                  {notif.title}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  {notif.subtitle}
                </div>
              </div>
            </foreignObject>
          </g>
        ))}
      </svg>

      <style jsx>{`
        .flow-wrapper {
          position: relative;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .flow-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .connection-line {
          animation: linePulse 3s ease-in-out infinite;
        }

        .notification-card {
          transition: all 0.3s ease;
        }

        .notification-card:hover {
          transform: scale(1.02);
        }

        @keyframes linePulse {
          0%, 100% {
            stroke-opacity: 0.3;
          }
          50% {
            stroke-opacity: 0.6;
          }
        }

        @media (max-width: 768px) {
          .flow-svg {
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default FlowCanvas;
