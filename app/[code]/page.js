import { supabase } from '../../lib/supabase';
import { redirect, notFound } from 'next/navigation';

export default async function RedirectPage({ params }) {
  const { code } = params;

  // جلب الرابط الأصلي من قاعدة البيانات
  const { data, error } = await supabase
    .from('urls')
    .select('original_url, clicks')
    .eq('short_code', code)
    .single();

  // إذا لم يتم العثور على الرابط
  if (error || !data) {
    notFound();
  }

  // زيادة عداد النقرات (+1)
  await supabase
    .from('urls')
    .update({ clicks: (data.clicks || 0) + 1 })
    .eq('short_code', code);

  // إعادة التوجيه الفوري للرابط الأصلي
  redirect(data.original_url);
}

