import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { nanoid } from 'nanoid';

export async function POST(request) {
  try {
    const { originalUrl } = await request.json();

    if (!originalUrl) {
      return NextResponse.json({ error: 'الرابط مطلوب' }, { status: 400 });
    }

    // توليد كود قصير عشوائي مكون من 6 خانات
    const shortCode = nanoid(6);

    // حفظ الرابط والكود في قاعدة البيانات
    const { error } = await supabase
      .from('urls')
      .insert([{ original_url: originalUrl, short_code: shortCode }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ shortCode });
  } catch (err) {
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}

