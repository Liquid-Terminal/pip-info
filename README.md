# 🚀 Token Information Dashboard

A real-time dashboard for tracking token and NFT holder analytics, built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Real-time Token Analytics**: Live price updates via WebSocket connection to HyperLiquid
- **NFT Holder Tracking**: Monitor NFT distribution and holder statistics
- **Token Holder Analytics**: Track token distribution with real-time value calculations
- **Export Functionality**: Download holder data as CSV files
- **Responsive Design**: Modern UI with dark theme optimized for data visualization
- **Real-time Updates**: Automatic data refresh with configurable intervals
- **Fork-Friendly**: Easy to adapt for any token/project with centralized configuration

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Tables**: @tanstack/react-table
- **Icons**: Lucide React
- **Real-time Data**: WebSocket connections
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Liquid-Terminal/pip-info.git

# Navigate to the project directory
cd pip-info

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📊 Dashboard Sections

### Token Analytics
- Real-time token price from HyperLiquid
- Total supply and market cap
- Holder distribution with percentages
- Export functionality for holder data

### NFT Analytics  
- NFT holder statistics
- Floor price tracking from Drip.Trade
- Holder ranking and distribution
- Real-time floor price in USD

### Sidebar Information
- Project overview and description
- Quick links to social media and trading platforms
- Token metadata and launch information

## 🔧 Configuration

All project-specific configuration is centralized in `src/config/constants.ts`:

```typescript
export const PROJECT_INFO = {
  PIP: {
    // Technical identifiers
    tokenId: "0xe85f43e1f91e3c8cdf3acbd7e0855b8e",
    tokenName: "PIP",
    nftContractAddress: "0xbc4a26ba78ce05E8bCbF069Bbb87FB3E1dAC8DF8",
    hyperliquidCoinId: "@107",
    
    // Display information
    name: "PIP",
    description: "Project description...",
    type: "Memecoin",
    chain: "HyperLiquid",
    
    // Assets and links
    banner: "/background.webp",
    links: {
      website: "https://example.com",
      telegram: "https://t.me/example",
      // ... more links
    }
  }
}
```

## 🔄 Forking Guide

This project is designed to be easily forked for any token. See [FORK_GUIDE.md](./FORK_GUIDE.md) for detailed instructions.

### Quick Fork Steps:

1. **Update Constants**: Modify `src/config/constants.ts` with your token information
2. **Replace Assets**: Add your project's images to `/public/`
3. **Update Metadata**: Modify `package.json` and `README.md`
4. **Deploy**: Deploy to Vercel or your preferred platform

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   └── page.tsx           # Main dashboard page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── tokenSection/     # Token analytics components
│   ├── nftSection/       # NFT analytics components
│   └── infoCard/         # Sidebar components
├── config/               # Configuration files
│   └── constants.ts      # Project constants
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── api/             # API clients
│   └── types/           # TypeScript type definitions
└── styles/              # Global styles
```

## 🔌 API Integration

The dashboard integrates with multiple APIs:

- **HyperLiquid**: Real-time token prices and trading data
- **Hyperscan**: Token holder analytics
- **Drip.Trade**: NFT floor price data

## 🚀 Deployment

### Vercel (Recommended)

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import the repository
4. Deploy automatically

### Other Platforms

The project is compatible with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [HyperLiquid](https://hyperliquid.xyz/) for real-time trading data
- [Hyperscan](https://hyperscan.com/) for holder analytics
- [Drip.Trade](https://drip.trade/) for NFT floor price data
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

## 📞 Support

For support, questions, or contributions:
- Open an issue on GitHub
- Join our community discussions
- Check the [FORK_GUIDE.md](./FORK_GUIDE.md) for detailed instructions

---

**Built with ❤️ for the crypto community**
