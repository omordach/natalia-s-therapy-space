import re

with open('src/components/Contact.tsx', 'r') as f:
    content = f.read()

# 1. Update imports
content = content.replace(
    "import { Mail, Phone, Send, MessageCircle, Facebook } from 'lucide-react';",
    "import { Mail, Phone, Send, MessageCircle, Facebook, Loader2 } from 'lucide-react';"
)

# 2. Add isSubmitting state
content = content.replace(
    """  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });""",
    """  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);"""
)

# 3. Update handleSubmit
content = content.replace(
    """  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    try {""",
    """  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    setIsSubmitting(true);

    try {"""
)

# 4. Add finally block
content = content.replace(
    """      toast({
        title: t('contact.toast.errorTitle'),
        description: t('contact.toast.errorDescription'),
        variant: 'destructive',
      });
    }
  };""",
    """      toast({
        title: t('contact.toast.errorTitle'),
        description: t('contact.toast.errorDescription'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };"""
)

# 5. Update submit button
content = content.replace(
    """            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              {t('contact.form.submit')}
            </button>""",
    """            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {t('contact.form.submit')}
            </button>"""
)

with open('src/components/Contact.tsx', 'w') as f:
    f.write(content)
