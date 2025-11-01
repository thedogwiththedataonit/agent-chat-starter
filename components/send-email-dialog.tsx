'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendEmail } from '@/lib/actions/send-email';

interface SendEmailDialogProps {
  jsx?: string;
}

export function SendEmailDialog({ jsx }: SendEmailDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; error?: string; data?: any } | null>(null);
  
  const defaultFrom = process.env.NEXT_PUBLIC_RESEND_SEND_DOMAIN || 'onboarding@resend.dev';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);
    
    const formData = new FormData(e.currentTarget);
    formData.append('jsx', jsx || '');
    
    startTransition(async () => {
      const response = await sendEmail(formData);
      setResult(response);
      
      // Auto-close dialog after 2 seconds on success
      if (response.success) {
        setTimeout(() => {
          setOpen(false);
          setResult(null);
        }, 2000);
      }
    });
  };

  const isDisabled = !jsx || isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          disabled={!jsx}
          className="gap-2"
        >
          <Send className="h-4 w-4" />
          Send Email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>
              Send this email using Resend. Make sure your "From" email is verified.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* From Email */}
            <div className="grid gap-2">
              <Label htmlFor="from">
                From <span className="text-red-500">*</span>
              </Label>
              <Input
                id="from"
                name="from"
                type="email"
                placeholder="onboarding@resend.dev"
                defaultValue={defaultFrom}
                required
                disabled={isPending}
              />

            </div>

            {/* To Email(s) */}
            <div className="grid gap-2">
              <Label htmlFor="to">
                To <span className="text-red-500">*</span>
              </Label>
              <Input
                id="to"
                name="to"
                type="text"
                placeholder="recipient@example.com"
                required
                disabled={isPending}
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple emails with commas
              </p>
            </div>

            {/* Reply-To (Optional) */}
            <div className="grid gap-2">
              <Label htmlFor="replyTo">Reply-To (Optional)</Label>
              <Input
                id="replyTo"
                name="replyTo"
                type="email"
                placeholder="reply@example.com"
                disabled={isPending}
              />
            </div>

            {/* Subject */}
            <div className="grid gap-2">
              <Label htmlFor="subject">
                Subject <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="Welcome to our platform!"
                required
                disabled={isPending}
              />
            </div>

            {/* Result Messages */}
            {result && (
              <div
                className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
                  result.success
                    ? 'bg-green-50 text-green-900 border border-green-200'
                    : 'bg-red-50 text-red-900 border border-red-200'
                }`}
              >
                {result.success ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Email sent successfully!</p>
                      {result.data?.id && (
                        <p className="text-xs mt-1">Email ID: {result.data.id}</p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Failed to send email</p>
                      <p className="text-xs mt-1">{result.error}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isDisabled}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Email
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

