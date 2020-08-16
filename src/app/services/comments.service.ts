import { Injectable } from '@angular/core';
import { Comment } from '../interfaces/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  collRef = this.db.collection('comments');

  constructor(private db: AngularFirestore) {}

  getComments() {
    return this.collRef.valueChanges();
  }

  getCommentsHide() {
    return this.db
      .collection('comments', (ref) => ref.where('show', '==', false))
      .valueChanges();
  }



  getCommentById(id: string) {
    return this.collRef.doc(id).valueChanges();
  }

  getCommentByProduct(id: string) {
    return this.db
      .collection('comments', (ref) => ref.where('product.id', '==', id))
      .valueChanges();
  }

  deleteComment(id: string) {
    return this.collRef.doc(id).delete();
  }

  showComment(comment: Comment) {
    comment.show = true;
    return this.updateComments(comment);
  }

  updateComments(comment: Comment) {
    return this.collRef.doc(comment.id).update(comment);
  }

  createComment(comment: Comment) {
    comment.id = this.db.createId();
    comment.date = new Date();
    return this.collRef.doc(comment.id).set(comment);
  }
}
