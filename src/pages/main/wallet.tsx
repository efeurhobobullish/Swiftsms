import { ArrowDownLeft, ArrowUpRight, Wallet as WalletIcon, CreditCard, Banknote } from "lucide-react";
import BottomNav from "@/layouts/BottomNav";

const TRANSACTIONS = [
  { id: 1, type: "deposit", amount: 5000, date: "Today, 9:41 AM", method: "Bank Transfer", status: "success" },
  { id: 2, type: "purchase", amount: 450, date: "Yesterday, 2:30 PM", method: "WhatsApp Number", status: "success" },
  { id: 3, type: "purchase", amount: 350, date: "Nov 23, 2025", method: "Telegram Number", status: "success" },
  { id: 4, type: "refund", amount: 250, date: "Nov 20, 2025", method: "Uber (Failed)", status: "success" },
];

export default function Wallet() {
  return (
    <div className="min-h-screen bg-background text-main font-sans pb-32">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-line px-6 py-4">
        <h1 className="text-lg font-bold">My Wallet</h1>
      </header>

      <main className="layout pt-6 space-y-8">
        
        {/* Main Card */}
        <div className="bg-main text-background rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-24 bg-background/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           
           <p className="text-background/70 text-sm font-medium mb-2">Total Assets</p>
           <h1 className="text-4xl font-bold tracking-tight mb-8">₦12,500.00</h1>

           <div className="flex gap-4">
             <button className="flex-1 bg-background text-main py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-background/90 transition-colors">
               <ArrowDownLeft size={18} /> Deposit
             </button>
             <button className="flex-1 bg-background/10 text-background py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 backdrop-blur-md hover:bg-background/20 transition-colors">
               <ArrowUpRight size={18} /> Withdraw
             </button>
           </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="font-bold text-lg mb-4">Payment Methods</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
             <div className="min-w-[140px] p-4 rounded-2xl border border-line bg-card flex flex-col gap-3 hover:border-main/50 cursor-pointer transition-colors">
                <CreditCard size={24} className="text-blue-500" />
                <span className="text-sm font-bold">Card</span>
             </div>
             <div className="min-w-[140px] p-4 rounded-2xl border border-line bg-card flex flex-col gap-3 hover:border-main/50 cursor-pointer transition-colors">
                <Banknote size={24} className="text-green-500" />
                <span className="text-sm font-bold">Transfer</span>
             </div>
             <div className="min-w-[140px] p-4 rounded-2xl border border-line bg-card flex flex-col gap-3 hover:border-main/50 cursor-pointer transition-colors">
                <WalletIcon size={24} className="text-orange-500" />
                <span className="text-sm font-bold">Crypto</span>
             </div>
          </div>
        </div>

        {/* Transactions */}
        <div>
          <h3 className="font-bold text-lg mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-2">
                 <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      tx.type === 'deposit' || tx.type === 'refund' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                    }`}>
                       {tx.type === 'deposit' || tx.type === 'refund' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-main">{tx.method}</h4>
                      <p className="text-xs text-muted">{tx.date}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className={`font-bold ${
                      tx.type === 'deposit' || tx.type === 'refund' ? 'text-green-600' : 'text-main'
                    }`}>
                      {tx.type === 'deposit' || tx.type === 'refund' ? '+' : '-'}₦{tx.amount}
                    </p>
                    <p className="text-[10px] text-muted uppercase font-bold">{tx.status}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>

      </main>
      <BottomNav />
    </div>
  );
}
