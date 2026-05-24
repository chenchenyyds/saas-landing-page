import ContactForm from "@/components/home/ContactForm";
import { defaultLocale, getDictionary } from "@/lib/i18n";

export default async function ContactPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return <ContactForm locale={dict.Contact} langName={langName} />;
}
