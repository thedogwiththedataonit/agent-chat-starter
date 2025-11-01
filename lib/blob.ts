import { put, type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { del } from '@vercel/blob';

/**
 * Uploads a file object to Vercel Blob storage (server-side)
 * @param file - The file object to upload
 * @returns The URL of the uploaded file
 */
export async function uploadFileToBlob(file: File): Promise<string> {
  try {
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // Generate a unique filename with timestamp
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `user-upload-${timestamp}.${fileExtension}`;

    const blob = await put(fileName, buffer, {
      access: 'public',
      contentType: file.type,
    });

    return blob.url;
  } catch (error) {
    console.error('Error uploading file to blob:', error);
    throw new Error('Failed to upload file to blob storage');
  }
}

/**
 * Uploads an image from a URL to Vercel Blob storage
 * @param imageUrl - The URL of the image to upload
 * @param fileName - The name to give the file in blob storage
 * @returns The URL of the uploaded file
 */
export async function uploadUrlToBlob(
  imageUrl: string,
  fileName: string
): Promise<string> {
  try {
    // Fetch the image from the URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch image from URL');
    }

    // Get the image data as a blob
    const imageBlob = await response.blob();

    // Upload to Vercel Blob
    const blob = await put(fileName, imageBlob, {
      access: 'public',
      allowOverwrite: true,
    });

    return blob.url;
  } catch (error) {
    console.error('Error uploading URL to blob:', error);
    throw new Error('Failed to upload URL to blob storage');
  }
}

/**
 * Client-side upload function for Vercel Blob
 * Uploads files directly from the browser to Vercel Blob
 * @param file - The file object to upload
 * @param onProgress - Optional callback for upload progress
 * @returns Promise with the blob result containing URL and metadata
 */
export async function uploadImageToBlob(
  file: File,
  onProgress?: (progress: number) => void
): Promise<PutBlobResult> {
  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        'Invalid file type. Please upload a JPEG, PNG, or WebP image.'
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error(
        'File size too large. Please upload an image smaller than 10MB.'
      );
    }

    // Generate a unique filename with timestamp
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `image-${timestamp}.${fileExtension}`;

    // Upload to Vercel Blob using client upload
    const blob = await upload(fileName, file, {
      access: 'public',
      handleUploadUrl: '/api/images/upload',
      clientPayload: JSON.stringify({
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      }),
    });

    return blob;
  } catch (error) {
    console.error('Error uploading image to blob:', error);
    throw new Error(
      `Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Deletes a blob from Vercel Blob storage using its URL
 * @param blobUrl - The URL of the blob to delete
 * @returns Promise that resolves when the blob is deleted
 */
export async function deleteBlob(blobUrl: string): Promise<void> {
  try {
    // The del function from @vercel/blob takes the blob URL
    await del(blobUrl);
    console.log(`Successfully deleted blob: ${blobUrl}`);
  } catch (error) {
    console.error('Error deleting blob:', error);
    throw new Error(
      `Failed to delete blob: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
